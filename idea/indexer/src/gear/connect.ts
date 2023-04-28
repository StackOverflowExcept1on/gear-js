import { GearApi } from '@gear-js/api';
import { RMQServiceActions } from '@gear-js/common';

import config from '../config';
import { changeStatus } from '../healthcheck';
import { GenesisCb, logger } from '../common';
import { GearIndexer } from './indexer';

let addresses = config.gear.providerAddresses;
const MAX_RECONNECTIONS = 10; //max count reconnection for each provider address
let reconnectionsCounter = 0;
export let providerAdd = addresses[0];
let connectionStatus = false;

export async function connectToNode(indexer: GearIndexer, cb: GenesisCb) {
  if (!providerAdd) {
    throw new Error('Not found provider address to connect');
  }

  const api = new GearApi({ providerAddress: providerAdd });

  try {
    await api.isReadyOrError;
    connectionStatus = true;
  } catch (error) {
    logger.error(`Failed to connect to ${providerAdd}`);
    indexer.stop();
    await retryConnectionToNode(api, indexer, cb);
  }
  await api.isReady;
  const genesis = api.genesisHash.toHex();

  api.on('disconnected', () => {
    connectionStatus = false;
    indexer.stop();
    genesis && cb(RMQServiceActions.DELETE, genesis);
    retryConnectionToNode(api, indexer, cb);
  });

  reconnectionsCounter = 0;
  connectionStatus = true;
  await indexer.run(api);
  cb(RMQServiceActions.ADD, genesis);
  logger.info(`⚙️ Connected to ${api.runtimeChain} with genesis ${genesis}`);
  changeStatus('gear');
}

async function retryConnectionToNode(api: GearApi, indexer: GearIndexer, cb: GenesisCb) {
  if (addresses.length === 0) throw new Error('️ 📡 Unable to connect node providers 🔴');

  if (connectionStatus) return;

  for (let i = 0; i <= addresses.length; i + 1) {
    if (connectionStatus) {
      reconnectionsCounter = 0;
      addresses = config.gear.providerAddresses;
      break;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await reconnect(api, indexer, cb);
  }
}

async function reconnect(api: GearApi, indexer: GearIndexer, cb: GenesisCb) {
  changeStatus('gear');

  if (connectionStatus) {
    return;
  }

  try {
    await api.disconnect();
  } catch (err) {
    console.log(err);
  }
  reconnectionsCounter++;

  if (reconnectionsCounter > MAX_RECONNECTIONS) {
    addresses = addresses.filter((address) => address !== providerAdd);
    providerAdd = addresses[0];
    reconnectionsCounter = 0;
  }

  logger.info('⚙️ 📡 Reconnecting to the gear node... 🟡');

  return connectToNode(indexer, cb);
}

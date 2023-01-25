import { Gear, GearApi } from '../src';
import { getSpec } from '../src/GearApi';
import { sleep } from './utilsFunctions';

let api: Gear.Api;

afterAll(async () => {
  await api.disconnect();
  await sleep(2000);
});

describe('GearApi', () => {
  test('get runtime spec', async () => {
    const spec = await getSpec();
    expect(spec).toHaveProperty('specName');
    expect(spec.specName).toBeDefined();
    expect(spec.specVersion).toBeDefined();
  });

  test('connect to api', async () => {
    api = await GearApi.create();
    expect(api.isConnected).toBeTruthy();
  });

  test('chain', async () => {
    expect(await api.chain()).toBe('Development');
  });

  test('nodeName', async () => {
    expect(await api.nodeName()).toBe('Gear Node');
  });

  test('runtimeChain', async () => {
    expect(api.runtimeChain.toHuman()).toBe('Development');
  });

  test('genesisHash', async () => {
    expect(api.genesisHash).toBeDefined();
  });

  test('nodeVersion', async () => {
    expect(await api.nodeVersion()).toBeDefined();
  });

  test('totalIssuance', async () => {
    expect(await api.totalIssuance()).toBeDefined();
  });

  test('existentialDeposit', () => {
    expect(api.existentialDeposit).toBeDefined();
  });

  test('mailboxTreshold', () => {
    expect(api.mailboxTreshold).toBeDefined();
  });

  test('waitlistCost', () => {
    expect(api.waitlistCost).toBeDefined();
  });
});

describe('Blocks', () => {
  test('get hash of the first block', async () => {
    expect(await api.blocks.getBlockHash(1)).toBeDefined();
  });

  test('get events of the first block', async () => {
    expect(await api.blocks.getEvents(await api.blocks.getBlockHash(1))).toBeDefined();
  });

  test('get extrinsics of the first block', async () => {
    expect(await api.blocks.getExtrinsics(await api.blocks.getBlockHash(1))).toBeDefined();
  });

  test('get finalized head', async () => {
    expect(await api.blocks.getFinalizedHead()).toBeDefined();
  });

  test('get block by block number', async () => {
    expect(await api.blocks.get(1)).toBeDefined();
  });

  test('get block timestamp', async () => {
    expect(await api.blocks.getBlockTimestamp(1)).toBeDefined();
  });

  test('get block number by hash', async () => {
    const hash = await api.blocks.getBlockHash(1);
    const blockNumber = await api.blocks.getBlockNumber(hash.toHex());
    expect(blockNumber.toNumber()).toBe(1);
  });
});

describe('Runtime consts', () => {
  test('blockGasLimit', () => {
    expect(api.blockGasLimit).not.toBeUndefined();
  });
});

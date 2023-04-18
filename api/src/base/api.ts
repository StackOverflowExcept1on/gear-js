import { ApiPromise, WsProvider } from '@polkadot/api';
import { DispatchError, Event } from '@polkadot/types/interfaces';
import { u128, u64 } from '@polkadot/types';
import { RegistryError } from '@polkadot/types-codec/types';

import { gearRpc, gearTypes } from '../common';
import { GBalance } from './balance';
import { GBlock } from './blocks';
import { GClaimValue } from './claim';
import { GCode } from './code';
import { GEvents } from './events';
import { GMailbox } from './mailbox';
import { GMessage } from './message';
import { GProgram } from './program';
import { GProgramState } from './state';
import { GProgramStorage } from './storage';
import { GWaitlist } from './waitlist';
import { GearApiOptions } from '../types';

export class GApi extends ApiPromise {
  public program: GProgram;
  public programState: GProgramState;
  public programStorage: GProgramStorage;
  public message: GMessage;
  public balance: GBalance;
  public gearEvents: GEvents;
  public mailbox: GMailbox;
  public claimValueFromMailbox: GClaimValue;
  public code: GCode;
  public waitlist: GWaitlist;
  public blocks: GBlock;
  public defaultTypes: Record<string, unknown>;
  public provider: WsProvider;

  constructor(options: GearApiOptions = {}) {
    const { types, providerAddress, ...restOptions } = options;
    const provider = restOptions?.provider || new WsProvider(providerAddress ?? 'ws://127.0.0.1:9944');
    const defaultTypes = { ...gearTypes, ...(types || {}) };

    super({
      provider,
      types: {
        ...defaultTypes,
      },
      rpc: {
        ...gearRpc,
      },
      runtime: {
        GearApi: [
          {
            methods: {},
            version: 1,
          },
        ],
      },
      ...restOptions,
    });

    this.provider = provider as WsProvider;

    this.defaultTypes = defaultTypes;

    this.initialize();
  }

  protected async initialize() {
    await this.isReady;
    this.program = new GProgram(this);
    this.message = new GMessage(this);
    this.balance = new GBalance(this);
    this.gearEvents = new GEvents(this);
    this.programState = new GProgramState(this);
    this.blocks = new GBlock(this);
    this.programStorage = new GProgramStorage(this);
    this.claimValueFromMailbox = new GClaimValue(this);
    this.mailbox = new GMailbox(this);
    this.code = new GCode(this);
    this.waitlist = new GWaitlist(this);
  }

  static async create(options?: GearApiOptions): Promise<GApi> {
    const api = new GApi(options);
    await api.isReady;
    return api;
  }

  async totalIssuance(): Promise<string> {
    return (await this.query.balances.totalIssuance()).toHuman() as string;
  }

  async chain(): Promise<string> {
    return (await this.rpc.system.chain()).toHuman();
  }

  async nodeName(): Promise<string> {
    return (await this.rpc.system.name()).toHuman();
  }

  async nodeVersion(): Promise<string> {
    return (await this.rpc.system.version()).toHuman();
  }

  get existentialDeposit(): u128 {
    return this.consts.balances.existentialDeposit as unknown as u128;
  }

  get blockGasLimit(): u64 {
    return this.consts.gearGas.blockGasLimit as unknown as u64;
  }

  get mailboxTreshold(): u64 {
    return this.consts.gear.mailboxThreshold as unknown as u64;
  }

  get waitlistCost(): u64 {
    return this.consts.gearScheduler.waitlistCost as unknown as u64;
  }

  /**
   * Method provides opportunity to get informations about error occurs in ExtrinsicFailed event
   * @param event
   * @returns
   */
  getExtrinsicFailedError(event: Event): RegistryError {
    const error = event.data[0] as DispatchError;
    const { isModule, asModule } = error;
    return isModule ? this.registry.findMetaError(asModule) : null;
  }
}

interface NetworkSpec {
  specName: string;
  specVersion: number;
}

export async function getSpec(address = 'ws://127.0.0.1:9944'): Promise<NetworkSpec> {
  const provider = new WsProvider(address);
  await provider.isReady;
  const { specVersion, specName } = await provider.send('state_getRuntimeVersion', []);
  await provider.disconnect();
  return { specVersion, specName };
}
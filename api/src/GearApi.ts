import { ApiPromise, WsProvider } from '@polkadot/api';
import { DispatchError, Event } from '@polkadot/types/interfaces';
import { u128, u64 } from '@polkadot/types';
import { RegistryError } from '@polkadot/types-codec/types';

import { gearRpc, gearTypes } from './default';
import { GearApiOptions } from './types';
import { GearBalance } from './Balance';
import { GearBlock } from './Blocks';
import { GearClaimValue } from './Claim';
import { GearCode } from './Code';
import { GearEvents } from './events';
import { GearMailbox } from './Mailbox';
import { GearMessage } from './Message';
import { GearProgram } from './Program';
import { GearProgramState } from './State';
import { GearStorage } from './Storage';
import { GearWaitlist } from './Waitlist';

export class GearApi extends ApiPromise {
  public balance: GearBalance;
  public blocks: GearBlock;
  public claimValueFromMailbox: GearClaimValue;
  public code: GearCode;
  public defaultTypes: Record<string, unknown>;
  public gearEvents: GearEvents;
  public mailbox: GearMailbox;
  public message: GearMessage;
  public program: GearProgram;
  public programState: GearProgramState;
  public storage: GearStorage;
  public waitlist: GearWaitlist;

  constructor(options: GearApiOptions = {}) {
    const { types, providerAddress, ...restOptions } = options;
    const provider = restOptions?.provider || new WsProvider(providerAddress ?? 'ws://127.0.0.1:9944');
    const defaultTypes = types ? { ...types, ...gearTypes } : gearTypes;

    super({
      provider,
      derives: {},
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

    this.defaultTypes = defaultTypes;

    this.initialize();
  }

  protected async initialize() {
    await this.isReady;

    this.program = new GearProgram(this);
    this.message = new GearMessage(this);
    this.balance = new GearBalance(this);
    this.gearEvents = new GearEvents(this);
    this.programState = new GearProgramState(this);
    this.blocks = new GearBlock(this);
    this.storage = new GearStorage(this);
    this.claimValueFromMailbox = new GearClaimValue(this);
    this.mailbox = new GearMailbox(this);
    this.code = new GearCode(this);
    this.waitlist = new GearWaitlist(this);
  }

  static async create(options?: GearApiOptions): Promise<GearApi> {
    const api = new GearApi(options);
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

export async function getSpec(address = 'ws://127.0.0.1:9944'): Promise<{ specName: string; specVersion: number }> {
  const provider = new WsProvider(address);
  provider.connect();
  await provider.isReady;
  return new Promise((resolve) =>
    provider.on('connected', () => {
      provider.send('state_getRuntimeVersion', []).then(({ specVersion, specName }) => {
        provider.disconnect().then(() => {
          resolve({ specVersion, specName });
        });
      });
    }),
  );
}

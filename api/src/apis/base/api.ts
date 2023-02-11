import { ApiPromise, WsProvider } from '@polkadot/api';
import { u128, u64 } from '@polkadot/types';
import { Event } from '@polkadot/types/interfaces';
import { RegistryError } from '@polkadot/types-codec/types';

import GBalance from './balance';
import GBlock from './blocks';
import GClaimValue from './claim';
import GCode from './code';
import GEvents from './events';
import GMailbox from './mailbox';
import GMessage from './message';
import GProgram from './program';
import GProgramState from './state';
import GProgramStorage from './storage';
import GWaitlist from './waitlist';
import { GearApiOptions } from '../../types';

declare class GApi extends ApiPromise {
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
  public chain: string;
  public totalissuance: u128;
  public nodeName: string;
  public nodeVersion: string;

  constructor(options: GearApiOptions);

  static create(options?: GearApiOptions): Promise<GApi>;

  get existentialDeposit(): u128;

  get blockGasLimit(): u64;

  get mailboxTreshold(): u64;

  get waitlistCost(): u64;

  /**
   * Method provides opportunity to get informations about error occurs in ExtrinsicFailed event
   * @param event
   * @returns
   */
  getExtrinsicFailedError(event: Event): RegistryError;
}

export default GApi;

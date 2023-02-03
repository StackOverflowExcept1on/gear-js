import { GClaimValue, GCode, GMailbox, GMessage, GProgram, GProgramState, GProgramStorage, GWaitlist } from 'base';
import { ApiInterface } from '../common';
import { GApi } from 'base/api.js';
import { GEvents } from '../../base/events';

declare class Api extends GApi {}

export default Api;

export interface VaraApi extends ApiInterface {
  program: GProgram;
  programState: GProgramState;
  programStorage: GProgramStorage;
  message: GMessage;
  gearEvents: GEvents;
  mailbox: GMailbox;
  claimValueFromMailbox: GClaimValue;
  code: GCode;
  waitlist: GWaitlist;
}

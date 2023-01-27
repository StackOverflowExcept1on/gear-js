import { Block } from './blocks';
import { Code } from './code';
import { Events } from './events';
import { GApi } from '../../base';
import { Gas } from './gas';
import { Mailbox } from './mailbox';
import { Message } from './message';
import { Program } from './program';
import { ProgramState } from './state';
import { Storage } from './storage';

declare class Api extends GApi {
  blocks: Block;
  code: Code;
  gas: Gas;
  gearEvents: Events;
  mailbox: Mailbox;
  message: Message;
  program: Program;
  programState: ProgramState;
  storage: Storage;
}

export default Api;

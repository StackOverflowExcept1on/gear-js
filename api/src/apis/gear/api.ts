import { Block } from './blocks';
import { Code } from './code';
import { Events } from './events';
import { GApi } from '../../base';
import { Mailbox } from './mailbox';
import { Message } from './message';
import { Program } from './program';
import { ProgramState } from './state';
import { Storage } from './storage';

declare class Api extends GApi {
  program: Program;
  programState: ProgramState;
  programStorage: Storage;
  message: Message;
  blocks: Block;
  gearEvents: Events;
  code: Code;
  mailbox: Mailbox;
}

export default Api;

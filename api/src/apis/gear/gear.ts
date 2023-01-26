import { Block } from './blocks';
import { GearApi } from '../../GearApi';
import { Message } from './message';
import { Program } from './program';
import { ProgramState } from './state';

export declare class Api extends GearApi {
  program: Program;
  message: Message;
  programState: ProgramState;
  blocks: Block;
}

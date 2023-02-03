import { AnyJson, Codec } from '@polkadot/types/types';
import { HexString } from '@polkadot/util/types';

import { GProgramState } from '../../base';
import { ProgramMetadata } from '../../common';
import { ReadStateArgs } from '../../types/interfaces';

export declare class ProgramState extends GProgramState {
  /**
   * Read state of particular program
   * @param programId
   * @param metaWasm - file with metadata
   * @returns decoded state
   */
  read(programId: HexString, metaWasm: Buffer, inputValue?: AnyJson): Promise<Codec>;

  /**
   *
   * @param args ProgramId and hash of block where it's necessary to read state (optional)
   * @param meta Program metadata returned from getProgramMetadata function
   * @param type (optional) Index of type to decode state. metadata.types.state is uesd by default
   */
  read(args: ReadStateArgs, meta: ProgramMetadata, type?: number): Promise<Codec>;
}

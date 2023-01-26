import { AnyJson, Codec } from '@polkadot/types/types';
import { HexString } from '@polkadot/util/types';

import { GearProgramState } from '../../State';
import { ProgramMetadata } from '../../metadata';
import { ReadStateArgs } from '../../types';

export declare class ProgramState extends GearProgramState {
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

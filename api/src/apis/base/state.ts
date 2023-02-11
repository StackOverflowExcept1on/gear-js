import { Codec } from '@polkadot/types/types';
import { HexString } from '@polkadot/util/types';

import { ProgramMetadata, StateMetadata } from '../../common';
import GProgramStorage from './storage';
import { ReadStateArgs } from '../../types';

declare class GProgramState extends GProgramStorage {
  /**
   * ## Read full program state
   * @param args `program id` and `block hash` (optional) at which it's neccessary to read state
   * @param meta ProgramMetadata
   * @param type (optional) type to decode state
   */
  read(args: ReadStateArgs, meta: ProgramMetadata, type?: number): Promise<Codec>;

  /**
   * ## Read state using meta wasm file
   * @param args
   * @param meta StateMetadata returned from getStateMetadata function
   */
  readUsingWasm(
    args: {
      programId: HexString;
      fn_name: string;
      wasm: Buffer | Uint8Array | HexString;
      argument?: any;
      at?: HexString;
    },
    meta?: StateMetadata,
  ): Promise<Codec>;
}

export default GProgramState;

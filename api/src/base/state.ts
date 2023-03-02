import { Codec } from '@polkadot/types/types';
import { HexString } from '@polkadot/util/types';

import { CreateType, ProgramMetadata, StateMetadata } from '../common';
import { GProgramStorage } from './storage';
import { ReadStateArgs } from '../types';

export class GProgramState extends GProgramStorage {
  /**
   * ## Read full program state
   * @param args `program id` and `block hash` (optional) at which it's neccessary to read state
   * @param meta ProgramMetadata
   * @param type (optional) type to decode state
   */
  async read(args: ReadStateArgs, meta: ProgramMetadata, type?: number): Promise<Codec> {
    const state = await this._api.rpc['gear'].readState(args.programId, args.at || null);
    return meta.createType(type || meta.types.state, state);
  }

  /**
   * ## Read state using meta wasm file
   * @param args
   * @param meta StateMetadata returned from getStateMetadata function
   */
  async readUsingWasm(
    args: {
      programId: HexString;
      fn_name: string;
      wasm: Buffer | Uint8Array | HexString;
      argument?: any;
      at?: HexString;
    },
    meta?: StateMetadata,
  ): Promise<Codec> {
    const fnTypes = meta?.functions[args.fn_name];

    const payload =
      fnTypes?.input !== undefined && fnTypes?.input !== null
        ? meta.createType(fnTypes.input, args.argument).toHex()
        : args.argument;

    const state = await this._api.rpc['gear'].readStateUsingWasm(
      args.programId,
      args.fn_name,
      CreateType.create('Bytes', args.wasm),
      payload || null,
      args.at || null,
    );
    return meta && fnTypes ? meta.createType(fnTypes.output, state) : state;
  }
}

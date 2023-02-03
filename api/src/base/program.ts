import { Bytes, Option } from '@polkadot/types';
import { H256 } from '@polkadot/types/interfaces';
import { HexString } from '@polkadot/util/types';
import { randomAsHex } from '@polkadot/util-crypto';

import { IProgram, OldMetadata, ProgramMap } from '../types/interfaces';
import { IProgramCreateOptions, IProgramCreateResult, IProgramUploadOptions, IProgramUploadResult } from '../types';
import { ProgramDoesNotExistError, ProgramExitedError, ProgramTerminatedError, SubmitProgramError } from '../errors';
import { ProgramMetadata, isProgramMeta } from '../common';
import { generateCodeHash, generateProgramId, getIdsFromKeys, validateGasLimit, validateValue } from '../utils';
import { GApi } from './api';
import { GGas } from './gas';
import { GTransaction } from './transaction';
import { encodePayload } from '../utils/create-payload';

export class GProgram extends GTransaction {
  public calculateGas: GGas;

  constructor(protected _api: GApi) {
    super(_api);
    this.calculateGas = new GGas(_api);
  }
  /** ### Upload program with code
   * @param args
   * @param metaOrHexRegistry Metadata
   * @param typeIndexOrMessageType type index in registry or type name
   */
  upload(
    args: IProgramUploadOptions,
    metaOrHexRegistry?: ProgramMetadata | HexString | OldMetadata,
    typeIndexOrTypeName?: number | string,
  ): IProgramUploadResult {
    validateValue(args.value, this._api);
    validateGasLimit(args.gasLimit, this._api);

    const salt = args.salt || randomAsHex(20);
    const code = this._api.createType('Bytes', Array.from(args.code)) as Bytes;

    const payload = encodePayload(
      args.initPayload,
      metaOrHexRegistry,
      isProgramMeta(metaOrHexRegistry) ? 'init' : 'init_input',
      typeIndexOrTypeName,
    );
    const codeId = generateCodeHash(code);
    const programId = generateProgramId(code, salt);

    try {
      this.extrinsic = this._api.tx.gear.uploadProgram(code, salt, payload, args.gasLimit, args.value || 0);
      return { programId, codeId, salt, extrinsic: this.extrinsic };
    } catch (error) {
      throw new SubmitProgramError();
    }
  }

  /** ## Create program using existed codeId
   * @param args
   * @param metaOrHexRegistry Metadata
   * @param typeIndexOrMessageType type index in registry or type name
   */
  create(
    { codeId, initPayload, value, gasLimit, ...args }: IProgramCreateOptions,
    metaOrHexRegistry?: HexString | ProgramMetadata | OldMetadata,
    typeIndexOrMessageType?: number | string,
  ): IProgramCreateResult {
    validateValue(value, this._api);
    validateGasLimit(gasLimit, this._api);

    const payload = encodePayload(
      initPayload,
      metaOrHexRegistry,
      isProgramMeta(metaOrHexRegistry) ? 'init' : 'init_input',
      typeIndexOrMessageType,
    );
    const salt = args.salt || randomAsHex(20);

    const programId = generateProgramId(codeId, salt);

    try {
      this.extrinsic = this._api.tx.gear.createProgram(codeId, salt, payload, gasLimit, value || 0);
      return { programId, salt, extrinsic: this.extrinsic };
    } catch (error) {
      throw new SubmitProgramError();
    }
  }

  /**
   * Get ids of all uploaded programs
   * @returns Array of program ids
   */
  async allUploadedPrograms(count?: number): Promise<HexString[]> {
    const prefix = this._api.query.gearProgram.programStorage.keyPrefix();
    const programIds: HexString[] = [];
    if (count) {
      const keys = await this._api.rpc.state.getKeysPaged(prefix, count);
      programIds.push(...getIdsFromKeys(keys, prefix));
    } else {
      count = 1000;
      const keys = await this._api.rpc.state.getKeysPaged(prefix, count);
      programIds.push(...getIdsFromKeys(keys, prefix));
      let keysLength = keys.length;
      let lastKey = keys.at(-1);
      while (keysLength === count) {
        const keys = await this._api.rpc.state.getKeysPaged(prefix, count, lastKey);
        programIds.push(...getIdsFromKeys(keys, prefix));
        lastKey = keys.at(-1);
        keysLength = keys.length;
      }
    }
    return programIds;
  }

  /**
   *
   * @param id A program id
   * @returns `true` if address belongs to program, and `false` otherwise
   */
  async exists(id: HexString): Promise<boolean> {
    const program = (await this._api.query.gearProgram.programStorage(id)) as Option<IProgram>;
    return program.isSome;
  }

  /**
   * Get codeHash of program on-chain
   * @param programId
   * @returns codeHash of the program
   */
  async codeHash(id: HexString): Promise<HexString> {
    const programOption = (await this._api.query.gearProgram.programStorage(id)) as Option<ProgramMap>;

    if (programOption.isNone) throw new ProgramDoesNotExistError();

    const program = programOption.unwrap()[0];

    if (program.isTerminated) throw new ProgramTerminatedError(id);

    if (program.isExited) throw new ProgramExitedError(program.asExited.toHex());

    return program.asActive.codeHash.toHex();
  }

  /**
   * ### Get hash of program metadata
   * @param programId
   * @param at (optional) block hash
   * @returns
   */
  async metaHash(programId: HexString, at?: HexString): Promise<HexString> {
    const metaHash = (await this._api.rpc['gear'].readMetahash(programId, at || null)) as H256;
    return metaHash.toHex();
  }
}

import { HexString } from '@polkadot/util/types';

import { IProgramCreateOptions, IProgramCreateResult, IProgramUploadOptions, IProgramUploadResult } from '../../types';
import GApi from './api';
import GGas from './gas';
import GTransaction from './transaction';
import { ProgramMetadata } from '../../common';

declare class GProgram extends GTransaction {
  public calculateGas: GGas;

  constructor(_api: GApi);

  /**
   * ### Upload program with code using program metadata to encode payload
   * @param args Program parameters
   * @param meta (optional) Program metadata obtained using `getProgramMetadata` function.
   * @param typeIndex (optional) Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
   * @returns Object containing program id, generated (or specified) salt, code id, prepared extrinsic
   * @example
   * ```javascript
   * const api = await GearApi.create();
   * const code = fs.readFileSync('path/to/program.opt.wasm');
   * cosnt hexMeta = '0x...';
   * const meta = getProgramMetadata(hexMeta);
   * const { programId, codeId, salt, extrinsic } = api.program.upload({
   *   code,
   *   initPayload: { field: 'someValue' },
   *   gasLimit: 20_000_000,
   * }, meta, meta.init.input);
   * api.program.signAndSend(account, (events) => {
   *   events.forEach(({event}) => console.log(event.toHuman()))
   * })
   * ```
   */
  upload(args: IProgramUploadOptions, meta?: ProgramMetadata, typeIndex?: number): IProgramUploadResult;

  /**
   * ### Upload program with code using registry in hex format to encode payload
   * @param args Program parameters
   * @param hexRegistry Registry presented as Hex string
   * @param typeIndex Index of type in the registry.
   * @returns Object containing program id, generated (or specified) salt, code id, prepared extrinsic
   */
  upload(args: IProgramUploadOptions, hexRegistry: HexString, typeIndex: number): IProgramUploadResult;

  /** ### Upload program with code
   * @param args
   * @param metaOrHexRegistry Metadata
   * @param typeIndexOrMessageType type index in registry or type name
   */
  upload(
    args: IProgramUploadOptions,
    metaOrHexRegistry?: ProgramMetadata | HexString,
    typeIndexOrTypeName?: number | string,
  ): IProgramUploadResult;

  /**
   * ### Create program from uploaded on chain code using program metadata to encode payload
   * @param args Program parameters
   * @param meta (optional) Program metadata obtained using `getProgramMetadata` function.
   * @param typeIndex (optional) Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
   * @returns Object containing program id, generated (or specified) salt, prepared extrinsic
   * @example
   * ```javascript
   * const api = await GearApi.create();
   * const codeId = '0x...';
   * cosnt hexMeta = '0x...';
   * const meta = getProgramMetadata(hexMeta);
   * const { programId, codeId, salt, extrinsic } = api.program.create({
   *   code,
   *   initPayload: { field: 'someValue' },
   *   gasLimit: 20_000_000,
   * }, meta, meta.init.input);
   * api.program.signAndSend(account, (events) => {
   *   events.forEach(({event}) => console.log(event.toHuman()))
   * })
   * ```
   */
  create(args: IProgramCreateOptions, meta?: ProgramMetadata, typeIndex?: number): IProgramCreateResult;

  /**
   * ### Create program from uploaded on chain code using registry in hex format to encode payload
   * @param args Program parameters
   * @param hexRegistry Registry presented as Hex string
   * @param typeIndex Index of type in the registry.
   * @returns Object containing program id, generated (or specified) salt, prepared extrinsic
   */

  create(args: IProgramCreateOptions, hexRegistry: HexString, typeIndex: number): IProgramCreateResult;
  /** ## Create program using existed codeId
   * @param args
   * @param metaOrHexRegistry Metadata
   * @param typeIndexOrMessageType type index in registry or type name
   */

  create(
    { codeId, initPayload, value, gasLimit, ...args }: IProgramCreateOptions,
    metaOrHexRegistry?: HexString | ProgramMetadata,
    typeIndexOrMessageType?: number | string,
  ): IProgramCreateResult;

  /**
   * Get ids of all uploaded programs
   * @returns Array of program ids
   */
  allUploadedPrograms(count?: number): Promise<HexString[]>;

  /**
   *
   * @param id A program id
   * @returns `true` if address belongs to program, and `false` otherwise
   */
  exists(id: HexString): Promise<boolean>;

  /**
   * Get codeHash of program on-chain
   * @param programId
   * @returns codeHash of the program
   */
  codeHash(id: HexString): Promise<HexString>;

  /**
   * ### Get hash of program metadata
   * @param programId
   * @param at (optional) block hash
   * @returns
   */
  metaHash(programId: HexString, at?: HexString): Promise<HexString>;
}

export default GProgram;

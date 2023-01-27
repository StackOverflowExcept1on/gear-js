import { HexString } from '@polkadot/util/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import { CodeStorage } from '../../types';
import { GCode } from '../../base';

export declare class Code extends GCode {
  /**
   * ### Submit code without initialization
   * @param code
   * @returns Code hash
   */
  upload(
    code: Buffer | Uint8Array,
  ): Promise<{ codeHash: HexString; submitted: SubmittableExtrinsic<'promise', ISubmittableResult> }>;

  /**
   * ### Check that codeId exists on chain
   * @param codeId
   */
  exists(codeId: string): Promise<boolean>;

  /**
   * ### Get code storage
   * @param codeId
   */
  storage(codeId: HexString): Promise<CodeStorage>;

  /**
   * ### Get static pages of code
   * @param codeId
   */
  staticPages(codeId: HexString): Promise<number | null>;

  /**
   * ### Get all ids of codes uploaded on connected chain
   * @returns array of code ids uploaded on chain
   */
  all(): Promise<HexString[]>;
}

import { Compact, u64 } from '@polkadot/types';
import { HexString } from '@polkadot/util/types';
import { SignedBlock } from '@polkadot/types/interfaces';

import { GBlock } from '../../base';

export declare class Block extends GBlock {
  /**
   * Get data of particular block by blockHash
   * @param hash
   * @returns
   */
  get(hash: HexString | Uint8Array): Promise<SignedBlock>;

  /**
   * Get data of particular block by blockNumber
   * @param number
   * @returns
   */
  get(number: number): Promise<SignedBlock>;

  /**
   * Get data of particular block by blockNumber or blockHash
   * @param hashOrNumber
   * @returns
   */
  get(hashOrNumber: HexString | Uint8Array | number): Promise<SignedBlock>;

  /**
   * ### Get block's timestamp
   * @param block
   */
  getBlockTimestamp(block: SignedBlock): Promise<Compact<u64>>;

  /**
   * ### Get block's timestamp by blockHash
   * @param hash
   */
  getBlockTimestamp(hash: HexString | Uint8Array): Promise<Compact<u64>>;

  /**
   * ### Get block's timestamp by blockNumber
   * @param number
   */
  getBlockTimestamp(number: number): Promise<Compact<u64>>;
}

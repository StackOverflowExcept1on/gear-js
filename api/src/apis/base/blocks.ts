import { AnyNumber, AnyTuple } from '@polkadot/types/types';
import { BlockHash, BlockNumber, SignedBlock } from '@polkadot/types/interfaces';
import { Compact, GenericExtrinsic, Vec, u64 } from '@polkadot/types';
import { FrameSystemEventRecord } from '@polkadot/types/lookup';
import { HeaderExtended } from '@polkadot/api-derive/types';
import { HexString } from '@polkadot/util/types';
import { Observable } from 'rxjs';
import { PromiseResult } from '@polkadot/api/types';

import GApi from './api';

declare class GBlock {
  subscribeNewHeads: PromiseResult<() => Observable<HeaderExtended>>;

  constructor(api: GApi);

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
   * Get data of particular block by blockNumber or blockHash
   * @param hashOrNumber
   * @returns
   */
  get(hashOrNumber: HexString | Uint8Array | number): Promise<SignedBlock>;

  /**
   * Get blockHash by number
   * @param number number of block
   * @returns blockHash
   */
  getBlockHash(number: AnyNumber | BlockNumber): Promise<BlockHash>;

  /**
   * Get block number
   * @param hash
   * @returns Compact<BlockNumber>
   */
  getBlockNumber(hash: `0x${string}` | Uint8Array): Promise<Compact<BlockNumber>>;

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

  getBlockTimestamp(blockOrHashOrNumber: HexString | Uint8Array | number | SignedBlock): Promise<Compact<u64>>;

  /**
   * Get all extrinsic of particular block
   * @param blockHash hash of particular block
   * @returns Vec of extrinsics
   */
  getExtrinsics(blockHash: `0x${string}` | Uint8Array): Promise<Vec<GenericExtrinsic<AnyTuple>>>;

  /**
   * Get all events of particular block
   * @param blockHash hash of particular block
   * @returns Vec of events
   */
  getEvents(blockHash: `0x${string}` | Uint8Array): Promise<Vec<FrameSystemEventRecord>>;

  /**
   * Get hash of last finalized block
   * @returns Hash of finalized head
   */
  getFinalizedHead(): Promise<BlockHash>;
}

export default GBlock;

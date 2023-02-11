import { HexString } from '@polkadot/util/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import GTransaction from './transaction';

/**
 * Claim value from mailbox
 */
declare class GClaimValue extends GTransaction {
  /**
   * Submit `claimValueFromMailbox` extrinsic
   * @param messageId MessageId with value to be claimed
   */
  submit(messageId: HexString): SubmittableExtrinsic<'promise', ISubmittableResult>;
}

export default GClaimValue;

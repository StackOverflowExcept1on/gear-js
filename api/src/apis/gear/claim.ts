import { HexString } from '@polkadot/util/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import { GClaimValue } from '../../base';

/**
 * Claim value from mailbox
 */
export declare class ClaimValue extends GClaimValue {
  /**
   * Submit `claimValueFromMailbox` extrinsic
   * @param messageId MessageId with value to be claimed
   */
  submit(messageId: HexString): SubmittableExtrinsic<'promise', ISubmittableResult>;
}

import { HexString } from '@polkadot/util/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import { Base } from '../apis';
import { ClaimValueError } from '../common';
import { GTransaction } from './transaction';

/**
 * Claim value from mailbox
 */
export class GClaimValue extends GTransaction implements Base.GClaimValue {
  /**
   * Submit `claimValueFromMailbox` extrinsic
   * @param messageId MessageId with value to be claimed
   */
  submit(messageId: HexString): SubmittableExtrinsic<'promise', ISubmittableResult> {
    try {
      this.extrinsic = this._api.tx.gear.claimValue(messageId);
      return this.extrinsic;
    } catch (error) {
      throw new ClaimValueError();
    }
  }
}

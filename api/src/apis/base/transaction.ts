import { AddressOrPair, SignerOptions, SubmittableExtrinsic } from '@polkadot/api/types';
import { Hash, RuntimeDispatchInfo } from '@polkadot/types/interfaces';
import { ISubmittableResult } from '@polkadot/types/types';

import GApi from './api';
import { TransactionStatusCb } from '../../types';

declare class GTransaction {
  extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>;

  constructor(_api: GApi);

  signAndSend(account: AddressOrPair, callback: TransactionStatusCb): Promise<() => void>;

  signAndSend(account: AddressOrPair, options?: Partial<SignerOptions>): Promise<Hash>;

  signAndSend(
    account: AddressOrPair,
    options: Partial<SignerOptions>,
    callback: TransactionStatusCb,
  ): Promise<() => void>;

  public signAndSend(
    account: AddressOrPair,
    optionsOrCallback?: Partial<SignerOptions> | TransactionStatusCb,
    optionalCallback?: TransactionStatusCb,
  ): Promise<Hash | (() => void)>;

  /**
   *
   * @param account
   * @param options
   * @example
   * ```javascript
   * const api = await GearApi.create();
   * api.program.submit({code, gasLimit});
   * // same for api.message, api.reply and others
   * const paymentInfo = await api.program.paymentInfo(alice);
   * const transactionFee = paymentInfo.partialFee.toNumber();
   * consolg.log(transactionFee);
   * ```
   */
  paymentInfo(account: AddressOrPair, options?: Partial<SignerOptions>): Promise<RuntimeDispatchInfo>;
}

export default GTransaction;

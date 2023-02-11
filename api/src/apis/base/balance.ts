import { BN } from '@polkadot/util';
import { Balance } from '@polkadot/types/interfaces';
import { ISubmittableResult } from '@polkadot/types/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import GTransaction from './transaction';

declare class GBalance extends GTransaction {
  findOut(publicKey: string): Promise<Balance>;

  transfer(to: string, value: number | BN): SubmittableExtrinsic<'promise', ISubmittableResult>;
}
export default GBalance;

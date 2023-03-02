import { BN } from '@polkadot/util';
import { Balance } from '@polkadot/types/interfaces';
import { ISubmittableResult } from '@polkadot/types/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import { Base } from '../apis';
import { GTransaction } from './transaction';
import { ISystemAccountInfo } from '../types';

export class GBalance extends GTransaction implements Base.GBalance {
  async findOut(publicKey: string): Promise<Balance> {
    const { data: balance } = (await this._api.query.system.account(publicKey)) as ISystemAccountInfo;
    return this._api.createType('Balance', balance.free) as Balance;
  }

  transfer(to: string, value: number | BN): SubmittableExtrinsic<'promise', ISubmittableResult> {
    this.extrinsic = this._api.tx.balances.transfer(to, value);
    return this.extrinsic;
  }
}
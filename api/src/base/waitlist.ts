import { HexString } from '@polkadot/util/types';
import { Option } from '@polkadot/types';

import { GApi } from './api';
import { WaitlistItem } from '../types';

export class GWaitlist {
  constructor(private _api: GApi) {}

  async readById(programId: HexString, messageId: HexString): Promise<WaitlistItem[]> {
    const waitlist = await this._api.query.gearMessenger.waitlist(programId, messageId);
    const typedWaitlist = this._api.createType(
      'Option<(GearCoreMessageStoredStoredDispatch, GearCommonStoragePrimitivesInterval)>',
      waitlist,
    ) as Option<WaitlistItem>;
    return typedWaitlist.unwrapOr(null);
  }

  async read(programId: HexString, numberOfMessages = 1000): Promise<WaitlistItem[]> {
    const keyPrefix = this._api.query.gearMessenger.waitlist.keyPrefix(programId);
    const keysPaged = await this._api.rpc.state.getKeysPaged(keyPrefix, numberOfMessages, keyPrefix);
    if (keysPaged.length === 0) {
      return [];
    }
    const waitlist = (await this._api.rpc.state.queryStorageAt(keysPaged)) as Option<WaitlistItem>[];
    return waitlist.map((item) => {
      const typedItem = this._api.createType(
        'Option<(GearCoreMessageStoredStoredDispatch, GearCommonStoragePrimitivesInterval)>',
        item,
      );
      return typedItem.unwrapOr(null);
    }) as WaitlistItem[];
  }
}

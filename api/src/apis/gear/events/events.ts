import { HexString } from '@polkadot/util/types';
import { UnsubscribePromise } from '@polkadot/api/types';

import { Transfer, UserMessageSent } from './types';
import Api from '../gear';
import { GearEvents } from '../../../events';
import { IBalanceCallback } from '../../../types';
import { IGearEvent } from './types';

export declare class Events extends GearEvents {
  constructor(api: Api);

  subscribeToGearEvent<M extends keyof IGearEvent>(
    method: M,
    callback: (event: IGearEvent[M]) => void | Promise<void>,
  ): UnsubscribePromise;

  subscribeToUserMessageSentByActor(
    options: { from?: HexString; to?: HexString },
    callback: (event: UserMessageSent) => void,
  ): UnsubscribePromise;

  subscribeToTransferEvents(callback: (event: Transfer) => void | Promise<void>): UnsubscribePromise;

  subscribeToBalanceChange(accountAddress: string, callback: IBalanceCallback): UnsubscribePromise;
}

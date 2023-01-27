import { UnsubscribePromise } from '@polkadot/api/types';

import { Hex, IBalanceCallback } from '../../../types';
import { Transfer, UserMessageSent } from './types';
import Api from '../gear';
import { GearEvents } from '../../../events';
import { IGearEvent } from './types';

export declare class Events extends GearEvents {
  constructor(api: Api);

  subscribeToGearEvent<M extends keyof IGearEvent>(
    method: M,
    callback: (event: IGearEvent[M]) => void | Promise<void>,
  ): UnsubscribePromise;

  subscribeToUserMessageSentByActor(
    options: { from?: Hex; to?: Hex },
    callback: (event: UserMessageSent) => void,
  ): UnsubscribePromise;

  subscribeToTransferEvents(callback: (event: Transfer) => void | Promise<void>): UnsubscribePromise;

  subscribeToBalanceChange(accountAddress: string, callback: IBalanceCallback): UnsubscribePromise;
}

import { HexString } from '@polkadot/util/types';
import { UnsubscribePromise } from '@polkadot/api/types';

import { IBalanceCallback, IGearEvent, Transfer, UserMessageSent } from '../../types';
import GApi from './api';

declare class GEvents {
  constructor(api: GApi);

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

export default GEvents;

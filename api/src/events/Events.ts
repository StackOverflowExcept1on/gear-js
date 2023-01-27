import { UnsubscribePromise } from '@polkadot/api/types';

import { Hex, IBalanceCallback, ISystemAccountInfo } from '../types';
import { Transfer, UserMessageSent } from './GearEvents';
import { GApi } from '../base';
import { IGearEvent } from './types';

export class GearEvents {
  constructor(private api: GApi) {}

  subscribeToGearEvent<M extends keyof IGearEvent>(
    method: M,
    callback: (event: IGearEvent[M]) => void | Promise<void>,
  ) {
    return this.api.query.system.events((events) => {
      events
        .filter(({ event }) => event.method === method)
        .forEach(({ event }) => {
          callback(event as IGearEvent[M]);
        });
    });
  }

  #umsActorsMatch(from: Hex, to: Hex, event: UserMessageSent): boolean {
    if (event.data.message.source.eq(from) || event.data.message.destination.eq(to)) {
      return true;
    }
    return false;
  }

  subscribeToUserMessageSentByActor(options: { from?: Hex; to?: Hex }, callback: (event: UserMessageSent) => void) {
    return this.api.query.system.events((events) => {
      events
        .filter(({ event }) => event.method === 'UserMessageSent')
        .forEach(({ event }) => {
          if (this.#umsActorsMatch(options.from, options.to, event as UserMessageSent)) {
            callback(event as UserMessageSent);
          }
        });
    });
  }

  subscribeToTransferEvents(callback: (event: Transfer) => void | Promise<void>): UnsubscribePromise {
    return this.api.query.system.events((events) => {
      events
        .filter(({ event }) => this.api.events.balances.Transfer.is(event))
        .forEach(({ event }) => {
          callback(event as Transfer);
        });
    });
  }

  async subscribeToBalanceChange(accountAddress: string, callback: IBalanceCallback): UnsubscribePromise {
    let {
      data: { free: previousFree },
    } = (await this.api.query.system.account(accountAddress)) as ISystemAccountInfo;

    return this.api.query.system.account(accountAddress, ({ data: { free: currentFree } }) => {
      if (!currentFree.sub(previousFree).isZero()) {
        callback(this.api.createType('Balance', currentFree));
        previousFree = currentFree;
      }
    });
  }
}

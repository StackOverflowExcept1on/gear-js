import { HexString } from '@polkadot/util/types';
import { UnsubscribePromise } from '@polkadot/api/types';

import { IBalanceCallback, ISystemAccountInfo } from '../../types';
import { Transfer, UserMessageSent } from './GearEvents';
import { GApi } from '..';
import { IGearEvent } from './types';

export class GEvents<GearEvent extends IGearEvent = IGearEvent> {
  constructor(private api: GApi) {}

  subscribeToGearEvent<M extends keyof GearEvent>(method: M, callback: (event: GearEvent[M]) => void | Promise<void>) {
    return this.api.query.system.events((events) => {
      events
        .filter(({ event }) => event.method === method)
        .forEach(({ event }) => {
          callback(event as GearEvent[M]);
        });
    });
  }

  #umsActorsMatch(from: HexString, to: HexString, event: UserMessageSent): boolean {
    if (event.data.message.source.eq(from) || event.data.message.destination.eq(to)) {
      return true;
    }
    return false;
  }

  subscribeToUserMessageSentByActor(
    options: { from?: HexString; to?: HexString },
    callback: (event: UserMessageSent) => void,
  ) {
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

import { HexString } from '@polkadot/util/types';
import { UnsubscribePromise } from '@polkadot/api/types';

import { IBalanceCallback, IGearEvent, ISystemAccountInfo, Transfer, UserMessageSent } from '../types';
import { Base } from '../apis';
import { GApi } from '../base';

export class GEvents implements Base.GEvents {
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

  subscribeToUserMessageSentByActor(
    options: { from?: HexString; to?: HexString },
    callback: (event: UserMessageSent) => void,
  ) {
    return this.api.query.system.events((events) => {
      events
        .filter(({ event }) => event.method === 'UserMessageSent')
        .forEach(({ event }) => {
          if (umsActorsMatch(options.from, options.to, event as UserMessageSent)) {
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

function umsActorsMatch(from: HexString, to: HexString, event: UserMessageSent): boolean {
  if (event.data.message.source.eq(from) || event.data.message.destination.eq(to)) {
    return true;
  }
  return false;
}

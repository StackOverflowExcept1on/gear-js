import { SubmittableExtrinsic, UnsubscribePromise } from '@polkadot/api/types';
import { HexString } from '@polkadot/util/types';
import { KeyringPair } from '@polkadot/keyring/types';

import {
  GApi,
  GKeyring,
  GTransaction,
  IGearEvent,
  MessageEnqueued,
  MessageWaitedData,
  MessagesDispatched,
  UserMessageSent,
  UserMessageSentData,
} from '../src';

export const checkInit = (api: GApi, programId: string) => {
  let unsub: UnsubscribePromise;
  let messageId: HexString;
  const initPromise = new Promise((resolve, reject) => {
    unsub = api.query.system.events((events) => {
      events.forEach(({ event }) => {
        switch (event.method) {
          case 'MessageEnqueued':
            const meEvent = event as MessageEnqueued;
            if (meEvent.data.destination.eq(programId) && meEvent.data.entry.isInit) {
              messageId = meEvent.data.id.toHex();
            }
            break;
          case 'MessagesDispatched': {
            const mdEvent = event as MessagesDispatched;
            for (const [id, status] of mdEvent.data.statuses) {
              if (id.eq(messageId)) {
                if (status.isSuccess) {
                  resolve('success');
                  break;
                }
              }
            }
            break;
          }
          case 'UserMessageSent': {
            const {
              data: { message },
            } = event as UserMessageSent;
            if (message.details.isSome) {
              const details = message.details.unwrap();
              if (details.isReply) {
                const reply = details.asReply;
                if (reply.replyTo.eq(messageId) && !reply.statusCode.eq(0)) {
                  reject(message.payload.toHuman());
                }
              }
            }
          }
        }
      });
    });
  });

  return async () => {
    const result = await initPromise;
    (await unsub)();
    return result;
  };
};

export function listenToUserMessageSent(api: GApi, programId: HexString) {
  const messages: UserMessageSent[] = [];
  const unsub = api.gearEvents.subscribeToGearEvent('UserMessageSent', (event) => {
    if (event.data.message.source.eq(programId)) {
      messages.push(event);
    }
  });
  return async (messageId: HexString | null): Promise<UserMessageSentData> => {
    const message = messages.find(
      ({
        data: {
          message: { details },
        },
      }) => {
        if (messageId === null) {
          return details.isNone;
        }

        if (details.isSome) {
          return details.unwrap().isReply && details.unwrap().asReply.replyTo.eq(messageId);
        } else {
          return false;
        }
      },
    );
    (await unsub)();
    if (!message) {
      throw new Error('UserMessageSent not found');
    }
    return message.data;
  };
}

export async function sendTransaction<E extends keyof IGearEvent = keyof IGearEvent>(
  submitted: GTransaction | SubmittableExtrinsic<'promise'>,
  account: KeyringPair,
  methodName: E,
): Promise<any> {
  return new Promise((resolve, reject) => {
    submitted
      .signAndSend(account, ({ events, status }) => {
        events.forEach(({ event: { method, data } }) => {
          if (method === methodName && status.isFinalized) {
            resolve(data.toHuman());
          } else if (method === 'ExtrinsicFailed') {
            reject(data.toString());
          }
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err.message);
      });
  });
}

export const getAccount = () => {
  return Promise.all([GKeyring.fromSuri('//Alice'), GKeyring.fromSuri('//Bob')]);
};

export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const describeif = (condition: boolean) => (condition ? describe : describe.skip);

export const testif = (condition: boolean) => (condition ? test : test.skip);

export const listenToMessageWaited = (api: GApi) => {
  const messages: MessageWaitedData[] = [];
  const unsub = api.gearEvents.subscribeToGearEvent('MessageWaited', (event) => {
    messages.push(event.data);
  });
  return async (messageId: HexString): Promise<MessageWaitedData> => {
    const message = messages.find(({ id }) => id.eq(messageId));
    (await unsub)();
    if (!message) {
      throw new Error('MessageWaited not found');
    }
    return message;
  };
};

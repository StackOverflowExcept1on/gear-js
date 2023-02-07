import { SubmittableExtrinsic, VoidFn } from '@polkadot/api/types';
import { HexString } from '@polkadot/util/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { ReplaySubject } from 'rxjs';

import { IMessageSendOptions, IMessageSendReplyOptions } from '../types';
import { ProgramMetadata, SendMessageError, SendReplyError } from '../common';
import { encodePayload, validateGasLimit, validateValue } from '../utils';
import { GTransaction } from './transaction';
import { UserMessageSentData } from './events';

export class GMessage extends GTransaction {
  /**
   * ## Send Message
   * @param message
   * @param metaOrHexRegistry Metadata
   * @param typeIndexOrMessageType type index in registry or type name
   * @returns Submitted result
   */
  send(
    { destination, value, gasLimit, ...args }: IMessageSendOptions,
    metaOrHexRegistry?: ProgramMetadata | HexString,
    typeIndexOrMessageType?: number | string,
  ): SubmittableExtrinsic<'promise', ISubmittableResult> {
    validateValue(value, this._api);
    validateGasLimit(gasLimit, this._api);

    const payload = encodePayload(args.payload, metaOrHexRegistry, 'handle', typeIndexOrMessageType);

    try {
      this.extrinsic = this._api.tx.gear.sendMessage(destination, payload, gasLimit, value || 0);
      return this.extrinsic;
    } catch (error) {
      throw new SendMessageError(error.message);
    }
  }
  /**
   * Sends reply message
   * @param args Message parameters
   * @param metaOrHexRegistry Metadata
   * @param typeIndexOrMessageType type index in registry or type name
   * @returns Submitted result
   */
  sendReply(
    { value, gasLimit, replyToId, ...args }: IMessageSendReplyOptions,
    metaOrHexRegistry?: ProgramMetadata | HexString,
    typeIndexOrMessageType?: number | string,
  ): SubmittableExtrinsic<'promise', ISubmittableResult> {
    validateValue(value, this._api);
    validateGasLimit(gasLimit, this._api);

    const payload = encodePayload(args.payload, metaOrHexRegistry, 'reply', typeIndexOrMessageType);

    try {
      this.extrinsic = this._api.tx.gear.sendReply(replyToId, payload, gasLimit, value);
      return this.extrinsic;
    } catch (error) {
      throw new SendReplyError();
    }
  }

  listenToReplies(programId: HexString, bufferSize = 5) {
    let unsub: VoidFn;
    const subject = new ReplaySubject<[HexString, UserMessageSentData]>(bufferSize);
    let messageId: HexString;

    this._api.gearEvents
      .subscribeToGearEvent('UserMessageSent', ({ data }) => {
        if (data.message.source.eq(programId)) {
          if (data.message.details.isSome && data.message.details.unwrap().isReply) {
            const id = data.message.details.unwrap().asReply.replyTo.toHex();
            if (!messageId || id === messageId) {
              subject.next([data.message.details.unwrap().asReply.replyTo.toHex(), data]);
            }
          }
        }
      })
      .then((result) => {
        unsub = result;
      });

    return (messageId: HexString): Promise<UserMessageSentData> => {
      return new Promise((resolve) => {
        subject.subscribe({
          next: ([id, data]) => {
            if (id === messageId) {
              subject.complete();
              unsub();
              resolve(data);
            }
          },
        });
      });
    };
  }
}

import { HexString } from '@polkadot/util/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import { IMessageSendOptions, IMessageSendReplyOptions, OldMetadata } from '../../types';
import { GMessage } from '../../base';
import { ProgramMetadata } from '../../common/metadata';

export declare class Message extends GMessage {
  /**
   * ## Send Message
   * @param args Message parameters
   * @param meta Program metadata obtained using `getProgramMetadata` function.
   * @param typeIndex (optional) Index of type in the registry. If not specified the type index from `meta.handle.input` will be used instead.
   * @returns Submitted result
   * ```javascript
   * const programId = '0x..';
   * const hexMeta = '0x...';
   * const meta = getProgramMetadata(hexMeta);
   *
   * const tx = api.message.send({
   *   destination: programId,
   *   payload: { amazingPayload: { } },
   *   gasLimit: 20_000_000
   * }, meta, meta.handle.input)
   *
   * tx.signAndSend(account, (events) => {
   *   events.forEach(({event}) => console.log(event.toHuman()))
   * })
   * ```
   */
  send(
    args: IMessageSendOptions,
    meta?: ProgramMetadata,
    typeIndex?: number,
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;

  /**
   * @deprecated This method will ber removed as soon as we move completely to the new metadata
   */
  send(
    args: IMessageSendOptions,
    meta?: OldMetadata,
    messageType?: string,
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;

  send(
    args: IMessageSendOptions,
    hexRegistry: HexString,
    typeIndex: number,
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;

  send(
    args: IMessageSendOptions,
    metaOrHexRegistry?: ProgramMetadata | HexString | OldMetadata,
    typeIndexOrMessageType?: number | string,
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;

  /**
   * Sends reply message
   * @param args Message parameters
   * @param meta Program metadata obtained using `getProgramMetadata` function.
   * @param typeIndex (optional) Index of type in the registry. If not specified the type index from `meta.reply.input` will be used instead.
   * @returns Submitted result
   * ```javascript
   * const replyToMessage = '0x..';
   * const hexMeta = '0x...';
   * const meta = getProgramMetadata(hexMeta);
   *
   * const tx = api.message.send({
   *   replyToId: replyToMessage,
   *   payload: { amazingPayload: { } },
   *   gasLimit: 20_000_000
   * }, meta, meta.reply.input)
   *
   * tx.signAndSend(account, (events) => {
   *   events.forEach(({event}) => console.log(event.toHuman()))
   * })
   * ```
   */
  sendReply(
    args: IMessageSendReplyOptions,
    meta?: ProgramMetadata,
    typeIndex?: number,
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;

  /**
   * @deprecated This method will ber removed as soon as we move completely to the new metadata
   */
  sendReply(
    args: IMessageSendReplyOptions,
    meta?: OldMetadata,
    messageType?: string,
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;

  sendReply(
    args: IMessageSendReplyOptions,
    hexRegistry: HexString,
    typeIndex: number,
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;

  sendReply(
    args: IMessageSendReplyOptions,
    metaOrHexRegistry?: ProgramMetadata | HexString | OldMetadata,
    typeIndexOrMessageType?: number | string,
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;
}

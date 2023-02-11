import { HexString } from '@polkadot/util/types';
import { ISubmittableResult } from '@polkadot/types/types';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import { IMessageSendOptions, IMessageSendReplyOptions, UserMessageSentData } from '../../types';
import GTransaction from './transaction';
import { ProgramMetadata } from '../../common';

declare class GMessage extends GTransaction {
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
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;

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
  ): SubmittableExtrinsic<'promise', ISubmittableResult>;

  listenToReplies(programId: HexString, bufferSize: number): (messageId: HexString) => Promise<UserMessageSentData>;
}

export default GMessage;

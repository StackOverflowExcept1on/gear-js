import { GenericEvent, GenericEventData } from '@polkadot/types';

import {
  CodeChangedData,
  DebugData,
  DebugModeData,
  MessageEnqueuedData,
  MessageWaitedData,
  MessageWakenData,
  MessagesDispatchedData,
  ProgramChangedData,
  TransferData,
  UserMessageReadData,
  UserMessageSentData,
} from './eventData';

export declare interface IGearEvent {
  MessageEnqueued: MessageEnqueued;
  UserMessageSent: UserMessageSent;
  UserMessageRead: UserMessageRead;
  MessagesDispatched: MessagesDispatched;
  MessageWaited: MessageWaited;
  MessageWaken: MessageWaken;
  CodeChanged: CodeChanged;
  ProgramChanged: ProgramChanged;
  DebugDataSnapshot: DebugDataSnapshot;
  DebugMode: DebugMode;
}

export declare interface GearEvent<D extends GenericEventData> extends GenericEvent {
  data: D;
}

export declare type MessageEnqueued = GearEvent<MessageEnqueuedData>;

export declare type UserMessageSent = GearEvent<UserMessageSentData>;

export declare type UserMessageRead = GearEvent<UserMessageReadData>;

export declare type MessagesDispatched = GearEvent<MessagesDispatchedData>;

export declare type MessageWaited = GearEvent<MessageWaitedData>;

export declare type MessageWaken = GearEvent<MessageWakenData>;

export declare type CodeChanged = GearEvent<CodeChangedData>;

export declare type ProgramChanged = GearEvent<ProgramChangedData>;

export declare type DebugDataSnapshot = GearEvent<DebugData>;

export declare type DebugMode = GearEvent<DebugModeData>;

export declare type Transfer = GearEvent<TransferData>;

import { CodeChangedData, DebugData, DebugModeData, MessageEnqueuedData, MessageWaitedData, MessageWakenData, MessagesDispatchedData, ProgramChangedData, TransferData, UserMessageReadData, UserMessageSentData } from './events-data';
import { GenericEvent, GenericEventData } from '@polkadot/types';

export interface GearEvent<D extends GenericEventData> extends GenericEvent {
  data: D;
}

export type MessageEnqueued = GearEvent<MessageEnqueuedData>;

export type UserMessageSent = GearEvent<UserMessageSentData>;

export type UserMessageRead = GearEvent<UserMessageReadData>;

export type MessagesDispatched = GearEvent<MessagesDispatchedData>;

export type MessageWaited = GearEvent<MessageWaitedData>;

export type MessageWaken = GearEvent<MessageWakenData>;

export type CodeChanged = GearEvent<CodeChangedData>;

export type ProgramChanged = GearEvent<ProgramChangedData>;

export type DebugDataSnapshot = GearEvent<DebugData>;

export type DebugMode = GearEvent<DebugModeData>;

export type Transfer = GearEvent<TransferData>;



export interface IGearEvent {
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

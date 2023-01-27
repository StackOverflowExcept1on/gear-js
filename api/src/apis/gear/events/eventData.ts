import { AccountId32, BlockNumber } from '@polkadot/types/interfaces';
import { BTreeMap, BTreeSet, Bool, GenericEventData, Option, Vec, u128, u32 } from '@polkadot/types';
import { GasNodeId, ReservationId } from 'types/interfaces/ids/gas';

import {
  CodeChangeKind,
  CodeId,
  DispatchStatus,
  Entry,
  MessageId,
  MessageWaitedReason,
  MessageWokenReason,
  ProgramChangedKind,
  ProgramDetails,
  ProgramId,
  QueuedDispatch,
  UserMessageReadReason,
  UserMessageSentMessage,
} from '../../../types';

export declare class GearEventData extends GenericEventData {
  constructor(data: GenericEventData);
}

export declare interface MessageEnqueuedData extends GenericEventData {
  id: MessageId;
  source: AccountId32;
  destination: ProgramId;
  entry: Entry;
}

export declare interface UserMessageSentData extends GenericEventData {
  message: UserMessageSentMessage;
  expiration: Option<BlockNumber>;
}

export declare interface UserMessageReadData extends GenericEventData {
  id: MessageId;
  reason: UserMessageReadReason;
}

export declare interface MessagesDispatchedData extends GenericEventData {
  total: u32;
  statuses: BTreeMap<MessageId, DispatchStatus>;
  stateChanges: BTreeSet<ProgramId>;
}

export declare interface MessageWaitedData extends GenericEventData {
  id: MessageId;
  origin: Option<GasNodeId<MessageId, ReservationId>>;
  reason: MessageWaitedReason;
  expiration: BlockNumber;
}

export declare interface MessageWakenData extends GenericEventData {
  id: MessageId;
  reason: MessageWokenReason;
}

export declare interface CodeChangedData extends GenericEventData {
  id: CodeId;
  change: CodeChangeKind;
}

export declare interface ProgramChangedData extends GenericEventData {
  id: ProgramId;
  change: ProgramChangedKind;
}

export declare interface DebugData extends GenericEventData {
  dispatchQueue: Vec<QueuedDispatch>;
  programs: Vec<ProgramDetails>;
}

export declare interface DebugModeData extends GenericEventData {
  enabled: Bool;
}

export declare interface TransferData extends GenericEventData {
  from: AccountId32;
  to: AccountId32;
  amount: u128;
}

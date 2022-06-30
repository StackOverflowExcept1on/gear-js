import { IBaseDBRecord, IGenesis } from './common';
import { IMessage, IMessageEnqueuedData, IMessagesDispatchedData } from './message';
import { IProgram, IProgramChangedData } from './program';

enum Keys {
  MessageEnqueued = 'MessageEnqueued',
  UserMessageSent = 'UserMessageSent',
  MessagesDispatched = 'MessagesDispatched',
  ProgramChanged = 'ProgramChanged',
  CodeChanged = 'CodeChanged',
  DatabaseWiped = 'DatabaseWiped',
}

interface NewEventData<K extends Keys, V> {
  key: K;
  value: V;
}

interface IMessageEnqueuedKafkaValue extends IMessageEnqueuedData, IBaseDBRecord<number> {}

interface IUserMessageSentKafkaValue extends IMessage, IBaseDBRecord<number> {}

interface IProgramChangedKafkaValue extends IProgramChangedData, IBaseDBRecord<number> {}

interface IMessagesDispatchedKafkaValue extends IMessagesDispatchedData, IBaseDBRecord<number> {}

export {
  Keys,
  NewEventData,
  IMessageEnqueuedKafkaValue,
  IUserMessageSentKafkaValue,
  IProgramChangedKafkaValue,
  IMessagesDispatchedKafkaValue,
};
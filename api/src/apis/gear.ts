import { AnyJson, Codec, ISubmittableResult } from '@polkadot/types/types';
import { Compact, u64 } from '@polkadot/types';
import { HexString } from '@polkadot/util/types';
import { SignedBlock } from '@polkadot/types/interfaces';
import { SubmittableExtrinsic } from '@polkadot/api/types';

import {
  GasInfo,
  IMessageSendOptions,
  IMessageSendReplyOptions,
  IProgramCreateOptions,
  IProgramCreateResult,
  IProgramUploadOptions,
  IProgramUploadResult,
  MailboxItem,
  OldMetadata,
  PayloadType,
  ReadStateArgs,
  Value,
  WaitlistItem,
} from '../types';
import { GearApi } from '../GearApi';
import { GearBlock } from '../Blocks';
import { GearGas } from '../Gas';
import { GearMailbox } from '../Mailbox';
import { GearMessage } from '../Message';
import { GearProgram } from '../Program';
import { GearProgramState } from '../State';
import { GearWaitlist } from '../Waitlist';
import { ProgramMetadata } from '../metadata';

export module Gear {
  export declare class Api extends GearApi {
    program: Program;
    message: Message;
    mailbox: Mailbox;
    programState: ProgramState;
    waitlist: Waitlist;
    gas: Gas;
    block: Block;
  }

  export declare class Program extends GearProgram {
    /**
     * ### Upload program with code using program metadata to encode payload
     * @param args Program parameters
     * @param meta (optional) Program metadata obtained using `getProgramMetadata` function.
     * @param typeIndex (optional) Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * @returns Object containing program id, generated (or specified) salt, code id, prepared extrinsic
     * @example
     * ```javascript
     * const api = await GearApi.create();
     * const code = fs.readFileSync('path/to/program.opt.wasm');
     * cosnt hexMeta = '0x...';
     * const meta = getProgramMetadata(hexMeta);
     * const { programId, codeId, salt, extrinsic } = api.program.upload({
     *   code,
     *   initPayload: { field: 'someValue' },
     *   gasLimit: 20_000_000,
     * }, meta, meta.init.input);
     * api.program.signAndSend(account, (events) => {
     *   events.forEach(({event}) => console.log(event.toHuman()))
     * })
     * ```
     */
    upload(args: IProgramUploadOptions, meta?: ProgramMetadata, typeIndex?: number): IProgramUploadResult;

    /**
     * @deprecated This method will be removed as soon as we move completely to the new metadata
     */
    upload(args: IProgramUploadOptions, meta?: OldMetadata, messageType?: string): IProgramUploadResult;

    /**
     * ### Upload program with code using registry in hex format to encode payload
     * @param args Program parameters
     * @param hexRegistry Registry presented as Hex string
     * @param typeIndex Index of type in the registry.
     * @returns Object containing program id, generated (or specified) salt, code id, prepared extrinsic
     */
    upload(args: IProgramUploadOptions, hexRegistry: HexString, typeIndex: number): IProgramUploadResult;

    upload(
      args: IProgramUploadOptions,
      metaOrHexRegistry?: ProgramMetadata | HexString | OldMetadata,
      typeIndexOrMessageType?: number | string,
    ): IProgramUploadResult;

    /**
     * ### Create program from uploaded on chain code using program metadata to encode payload
     * @param args Program parameters
     * @param meta (optional) Program metadata obtained using `getProgramMetadata` function.
     * @param typeIndex (optional) Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * @returns Object containing program id, generated (or specified) salt, prepared extrinsic
     * @example
     * ```javascript
     * const api = await GearApi.create();
     * const codeId = '0x...';
     * cosnt hexMeta = '0x...';
     * const meta = getProgramMetadata(hexMeta);
     * const { programId, codeId, salt, extrinsic } = api.program.create({
     *   code,
     *   initPayload: { field: 'someValue' },
     *   gasLimit: 20_000_000,
     * }, meta, meta.init.input);
     * api.program.signAndSend(account, (events) => {
     *   events.forEach(({event}) => console.log(event.toHuman()))
     * })
     * ```
     */
    create(args: IProgramCreateOptions, meta?: ProgramMetadata, typeIndex?: number): IProgramCreateResult;

    /**
     * @deprecated This method will be removed as soon as we move completely to the new metadata
     */
    create(args: IProgramCreateOptions, meta?: OldMetadata, messageType?: string): IProgramCreateResult;

    /**
     * ### Create program from uploaded on chain code using program metadata to encode payload
     * @param args Program parameters
     * @param hexRegistry Registry presented as Hex string
     * @param typeIndex Index of type in the registry.
     * @returns Object containing program id, generated (or specified) salt, prepared extrinsic
     */
    create(args: IProgramCreateOptions, hexRegistry: HexString, typeIndex: number): IProgramCreateResult;

    create(
      args: IProgramCreateOptions,
      metaOrHexRegistry?: HexString | ProgramMetadata | OldMetadata,
      typeIndexOrMessageType?: number | string,
    ): IProgramCreateResult;
  }

  export declare class Message extends GearMessage {
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

  export declare class Mailbox extends GearMailbox {
    /**
     * ## Read mailbox connected with account
     * @param accountId
     * @param numberOfMessages _(default 1000)_ number of messages that will be read from mailbox
     * ```javascript
     * const alice = '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d'
     * const api = await GearApi.create();
     * const mailbox = await api.mailbox.read(alice);
     * console.log(mailbox.map(item => item.toHuman()));
     * ```
     */
    read(accountId: HexString, numberOfMessages?: number): Promise<MailboxItem[]>;

    /**
     * ## Get particular message from mailbox
     * @param accountId
     * @param messageId
     * ```javascript
     * const api = await GearApi.create();
     *
     * const alice = '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d'
     * const messageId = '0xe9f3b99f23203d0c032868d3bd0349c8e243119626a8af98a2f4ac5ea6c78947'
     * const mailbox = await api.mailbox.read(alice, messageId);
     * if (mailbox !== null) {
     *   console.log(mailbox.toHuman());
     * }
     * ```
     */
    read(accountId: HexString, messageId: HexString): Promise<MailboxItem>;
  }

  export declare class ProgramState extends GearProgramState {
    /**
     * Read state of particular program
     * @param programId
     * @param metaWasm - file with metadata
     * @returns decoded state
     */
    read(programId: HexString, metaWasm: Buffer, inputValue?: AnyJson): Promise<Codec>;

    /**
     *
     * @param args ProgramId and hash of block where it's necessary to read state (optional)
     * @param meta Program metadata returned from getProgramMetadata function
     * @param type (optional) Index of type to decode state. metadata.types.state is uesd by default
     */
    read(args: ReadStateArgs, meta: ProgramMetadata, type?: number): Promise<Codec>;
  }

  export declare class Waitlist extends GearWaitlist {
    /**
     * ## _Read program's waitlist_
     * @param programId
     * @param numberOfMessages _(default 1000)_ number of messages that will be read from program's waitlist
     * @example
     * ```javascript
     * const api = await GearApi.create();
     * const waitlist = await api.waitlist.read('0xe0c6997d0bd83269ec108474494e2bd6ed156b30de599b9f2c91e82bb6ad04e8');
     * console.log(waitlist.map(item => item.toHuman()));
     * ```
     */
    read(programId: HexString, numberOfMessages?: number): Promise<WaitlistItem[]>;

    /**
     * ## _Get particular message from program's waitlist_
     * @param programId
     * @param messageId
     * @example
     * ```javascript
     * const api = await GearApi.create();
     * const programId = '0xe0c6997d0bd83269ec108474494e2bd6ed156b30de599b9f2c91e82bb6ad04e8'
     * const messageId = '0xe9f3b99f23203d0c032868d3bd0349c8e243119626a8af98a2f4ac5ea6c78947'
     * const waitlist = await api.waitlist.read(programId, messageId);
     * console.log(waitlist.toHuman());
     * ```
     */
    read(programId: HexString, messageId: HexString): Promise<WaitlistItem>;
  }

  export declare class Gas extends GearGas {
    /**
     * ### Get gas spent of init message using upload_program extrinsic
     * @param sourceId Account Id
     * @param code Program code
     * @param payload Payload of init message
     * @param value Value of message
     * @param allowOtherPanics Should RPC call return error if other contracts panicked, during communication with the initial one
     * @param meta (optional) Program metadata obtained using `getProgramMetadata` function.
     * @param typeIndexOrTypeName  Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * If meta is not passed it's possible to specify type name that can be one of the default rust types
     * @example
     * ```javascript
     * const code = fs.readFileSync('demo_meta.opt.wasm');
     * const meta = await getProgramMetadata('0x...');
     * const gas = await gearApi.program.gasSpent.init(
     *   '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
     *   code,
     *   {
     *     amount: 255,
     *     currency: 'GRT',
     *   },
     *   0,
     *   true,
     *   meta
     * );
     * console.log(gas.toJSON());
     *
     * // Or
     * const gas = await gearApi.program.gasSpent.init(
     *   '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
     *   code,
     *   'Hello',
     *   0,
     *   true,
     *   undefined,
     *   'String',
     * );
     * ```
     */
    initUpload(
      sourceId: HexString,
      code: HexString | Buffer,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: ProgramMetadata,
      typeIndexOrTypeName?: number,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of init message using upload_program extrinsic
     * @deprecated
     */
    initUpload(
      sourceId: HexString,
      code: HexString | Buffer,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      oldMeta?: OldMetadata,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of init message using upload_program extrinsic
     * @param sourceId Account id
     * @param code Program code
     * @param payload Payload of init message
     * @param value Value of message
     * @param allowOtherPanics Should RPC call return error if other contracts panicked, during communication with the initial one
     * @param meta Metadata
     * @param typeIndexOrTypeName Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * If meta is not passed it's possible to specify type name that can be one of the default rust types
     */
    initUpload(
      sourceId: HexString,
      code: HexString | Buffer,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: OldMetadata | ProgramMetadata,
      typeIndexOrTypeName?: number,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of init message using create_program extrinsic
     * @param sourceId Account id
     * @param code Program code
     * @param payload Payload of init message
     * @param value Value of message
     * @param allowOtherPanics Should RPC call return error if other contracts panicked, during communication with the initial one
     * @param meta Metadata
     * @param typeIndexOrTypeName  Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * If meta is not passed it's possible to specify type name that can be one of the default rust types
     * @example
     * ```javascript
     * const code = fs.readFileSync('demo_meta.opt.wasm');
     * const meta = await getProgramMetadata('0x...');
     * const gas = await gearApi.program.gasSpent.init(
     *   '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
     *   code,
     *   {
     *     amount: 255,
     *     currency: 'GRT',
     *   },
     *   0,
     *   true,
     *   meta,
     *   meta.types.init.input
     * );
     * console.log(gas.toJSON());
     * ```
     */
    initCreate(
      sourceId: HexString,
      code: HexString,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: ProgramMetadata,
      typeIndexOrTypeName?: number,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of init message using create_program extrinsic
     * @deprecated
     */
    initCreate(
      sourceId: HexString,
      code: HexString,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: OldMetadata,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of init message using create_program extrinsic
     * @param sourceId Account id
     * @param codeId Program code id
     * @param payload Payload of init message
     * @param value Value of message
     * @param allowOtherPanics Should RPC call return error if other contracts panicked, during communication with the initial one
     * @param meta Metadata
     * @param typeIndexOrTypeName  Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * If meta is not passed it's possible to specify type name that can be one of the default rust types
     * @example
     * ```javascript
     * const code = fs.readFileSync('demo_ping.opt.wasm');
     * const gas = await gearApi.program.gasSpent.init(
     *   '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
     *   code,
     *   '0x00',
     *   0
     *   false,
     * );
     * console.log(gas.toHuman());
     * ```
     */
    initCreate(
      sourceId: HexString,
      codeId: HexString,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: OldMetadata | ProgramMetadata,
      typeIndexOrTypeName?: number,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of init message using create_program extrinsic
     * @param sourceId Account id
     * @param codeId Program code id
     * @param payload Payload of init message
     * @param value Value of message
     * @param allowOtherPanics Should RPC call return error if other contracts panicked, during communication with the initial one
     * @param meta Metadata
     * @param typeIndexOrTypeName  Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * If meta is not passed it's possible to specify type name that can be one of the default rust types
     */
    initCreate(
      sourceId: HexString,
      codeId: HexString,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: OldMetadata | ProgramMetadata,
      typeIndexOrTypeName?: number,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of hanle message
     * @param sourceId Account id
     * @param destinationId Program id
     * @param payload Payload of message
     * @param value Value of message
     * @param allowOtherPanics Should RPC call return error if other contracts panicked, during communication with the initial one
     * @param meta Metadata
     * @param typeIndexOrTypeName  Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * If meta is not passed it's possible to specify type name that can be one of the default rust types
     * @example
     * ```javascript
     * const code = fs.readFileSync('demo_meta.opt.wasm');
     * const meta = await getProgramMetadata('0x...');
     * const gas = await gearApi.program.gasSpent.handle(
     *   '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
     *   '0xa178362715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
     *    {
     *       id: {
     *         decimal: 64,
     *         hex: '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
     *       },
     *    },
     *   0,
     *   true,
     *   meta
     * );
     * console.log(gas.toHuman());
     * ```
     */
    handle(
      sourceId: HexString,
      destinationId: HexString | Buffer,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: ProgramMetadata,
      typeIndexOrTypeName?: number,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of hanle message
     * @deprecated
     */
    handle(
      sourceId: HexString,
      destinationId: HexString | Buffer,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: OldMetadata,
    ): Promise<GasInfo>;

    /**
     * Get gas spent of hanle message
     * @param sourceId Account id
     * @param destinationId Program id
     * @param payload Payload of message
     * @param value Value of message
     * @param allowOtherPanics Should RPC call return error if other contracts panicked, during communication with the initial one
     * @param meta Metadata
     * @param typeIndexOrTypeName  Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * If meta is not passed it's possible to specify type name that can be one of the default rust types
     */
    handle(
      sourceId: HexString,
      destinationId: HexString | Buffer,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: OldMetadata | ProgramMetadata,
      typeIndexOrTypeName?: number,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of reply message
     * @param sourceId Account id
     * @param messageId Message id of a message waiting for response
     * @param exitCode Exit code of a message waiting for response
     * @param payload Payload of message
     * @param value Value of message
     * @param allowOtherPanics Should RPC call return error if other contracts panicked, during communication with the initial one
     * @param meta Metadata
     * @param typeIndexOrTypeName  Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * If meta is not passed it's possible to specify type name that can be one of the default rust types
     * @example
     * ```javascript
     * const code = fs.readFileSync('demo_async.opt.wasm');
     * const meta = await getProgramMetadata('0x...');
     * const gas = await gearApi.program.gasSpent.reply(
     *   '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
     *   '0x518e6bc03d274aadb3454f566f634bc2b6aef9ae6faeb832c18ae8300fd72635',
     *   0,
     *   'PONG',
     *   1000,
     *   true,
     *   meta,
     * );
     * console.log(gas.toJSON());
     * ```
     */
    reply(
      sourceId: HexString,
      messageId: HexString,
      exitCode: number,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: ProgramMetadata,
      typeIndexOrTypeName?: number,
    ): Promise<GasInfo>;

    /**
     * ### Get gas spent of reply message
     * @deprecated
     */
    reply(
      sourceId: HexString,
      messageId: HexString,
      exitCode: number,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: OldMetadata,
    ): Promise<GasInfo>;

    /**
     * Get gas spent of reply message
     * @param sourceId Account id
     * @param messageId Message id of a message waiting for response
     * @param exitCode Exit code of a message waiting for response
     * @param payload Payload of message
     * @param value Value of message
     * @param allowOtherPanics Should RPC call return error if other contracts panicked, during communication with the initial one
     * @param meta Metadata
     * @param typeIndexOrTypeName  Index of type in the registry. If not specified the type index from `meta.init.input` will be used instead.
     * If meta is not passed it's possible to specify type name that can be one of the default rust types
     */
    reply(
      sourceId: HexString,
      messageId: HexString,
      exitCode: number,
      payload: PayloadType,
      value?: Value,
      allowOtherPanics?: boolean,
      meta?: OldMetadata | ProgramMetadata,
      typeIndexOrTypeName?: number,
    ): Promise<GasInfo>;
  }

  export declare class Block extends GearBlock {
    /**
     * Get data of particular block by blockHash
     * @param hash
     * @returns
     */
    get(hash: HexString | Uint8Array): Promise<SignedBlock>;

    /**
     * Get data of particular block by blockNumber
     * @param number
     * @returns
     */
    get(number: number): Promise<SignedBlock>;

    /**
     * Get data of particular block by blockNumber or blockHash
     * @param hashOrNumber
     * @returns
     */
    get(hashOrNumber: HexString | Uint8Array | number): Promise<SignedBlock>;

    /**
     * ### Get block's timestamp
     * @param block
     */
    getBlockTimestamp(block: SignedBlock): Promise<Compact<u64>>;

    /**
     * ### Get block's timestamp by blockHash
     * @param hash
     */
    getBlockTimestamp(hash: HexString | Uint8Array): Promise<Compact<u64>>;

    /**
     * ### Get block's timestamp by blockNumber
     * @param number
     */
    getBlockTimestamp(number: number): Promise<Compact<u64>>;
  }
}

import { HexString } from '@polkadot/util/types';
import { isHex } from '@polkadot/util';

import { GasInfo, PayloadType, Value } from '../types';
import { ProgramMetadata, isProgramMeta } from '../common';
import { GApi } from './api';
import { OldMetadata } from '../types/interfaces';
import { encodePayload } from '../utils/create-payload';

export class GGas {
  constructor(private _api: GApi) {}

  async initUpload(
    sourceId: HexString,
    code: HexString | Buffer,
    payload: PayloadType,
    value?: Value,
    allowOtherPanics?: boolean,
    meta?: OldMetadata | ProgramMetadata,
    typeIndexOrTypeName?: number,
  ): Promise<GasInfo> {
    const _payload = encodePayload(payload, meta, isProgramMeta(meta) ? 'init' : 'init_input', typeIndexOrTypeName);
    return this._api.rpc['gear'].calculateInitUploadGas(
      sourceId,
      isHex(code) ? code : this._api.createType('Bytes', Array.from(code)).toHex(),
      _payload,
      value || 0,
      allowOtherPanics || true,
    );
  }

  async initCreate(
    sourceId: HexString,
    codeId: HexString,
    payload: PayloadType,
    value?: Value,
    allowOtherPanics?: boolean,
    meta?: OldMetadata | ProgramMetadata,
    typeIndexOrTypeName?: number,
  ): Promise<GasInfo> {
    const _payload = encodePayload(payload, meta, isProgramMeta(meta) ? 'init' : 'init_input', typeIndexOrTypeName);
    return this._api.rpc['gear'].calculateInitCreateGas(
      sourceId,
      codeId,
      _payload,
      value || 0,
      allowOtherPanics || true,
    );
  }

  async handle(
    sourceId: HexString,
    destinationId: HexString,
    payload: PayloadType,
    value?: Value,
    allowOtherPanics?: boolean,
    meta?: OldMetadata | ProgramMetadata,
    typeIndexOrTypeName?: number,
  ): Promise<GasInfo> {
    const _payload = encodePayload(payload, meta, isProgramMeta(meta) ? 'handle' : 'handle_input', typeIndexOrTypeName);
    return this._api.rpc['gear'].calculateHandleGas(
      sourceId,
      destinationId,
      _payload,
      value || 0,
      allowOtherPanics || true,
    );
  }

  async reply(
    sourceId: HexString,
    messageId: HexString,
    exitCode: number,
    payload: PayloadType,
    value?: Value,
    allowOtherPanics?: boolean,
    meta?: OldMetadata | ProgramMetadata,
    typeIndexOrTypeName?: number,
  ): Promise<GasInfo> {
    const _payload = encodePayload(
      payload,
      meta,
      isProgramMeta(meta) ? 'reply' : 'async_handle_input',
      typeIndexOrTypeName,
    );
    return this._api.rpc['gear'].calculateReplyGas(
      sourceId,
      messageId,
      exitCode,
      _payload,
      value || 0,
      allowOtherPanics || true,
    );
  }
}

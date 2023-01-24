import { isHex } from '@polkadot/util';

import { isProgramMeta, ProgramMetadata } from './metadata';
import { encodePayload } from './utils/create-payload';
import { Hex, PayloadType, Value } from './types';
import { OldMetadata } from './types/interfaces';
import { GearApi } from './GearApi';
import { GasInfo } from './types';

export class GearGas {
  constructor(private _api: GearApi) {}

  async initUpload(
    sourceId: Hex,
    code: Hex | Buffer,
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
    sourceId: Hex,
    codeId: Hex,
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
    sourceId: Hex,
    destinationId: Hex,
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
    sourceId: Hex,
    messageId: Hex,
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

import { isHex, isU8a, u8aToHex } from '@polkadot/util';
import { HexString } from '@polkadot/util/types';

import { isProgramMeta, isStateMeta } from '../common/metadata/is';
import { CreateType } from '../common/create-type/CreateType';
import { GearMetadata } from '../common/metadata/metadata';
import { HumanProgramMetadataRepr } from '../types';

export function getRegistry(metaOrHexRegistry: HexString): HexString {
  if (!metaOrHexRegistry) {
    return undefined;
  }

  if (isHex(metaOrHexRegistry)) {
    return metaOrHexRegistry;
  }
}

export function encodePayload<M extends GearMetadata = GearMetadata>(
  payload: unknown,
  hexRegistryOrMeta: HexString | M,
  type: keyof Omit<HumanProgramMetadataRepr, 'reg' | 'state' | 'signal'>,
  typeIndexOrMessageType?: number | string,
): HexString {
  if (payload === undefined) {
    return '0x';
  }

  if (isHex(payload)) {
    return payload;
  }

  if (isU8a(payload)) {
    return u8aToHex(payload);
  }

  if (isProgramMeta(hexRegistryOrMeta)) {
    return hexRegistryOrMeta.createType(hexRegistryOrMeta.types[type].input, payload).toHex();
  } else if (isStateMeta(hexRegistryOrMeta)) {
    // TODO
  } else if (isHex(hexRegistryOrMeta)) {
    if (typeof typeIndexOrMessageType === 'number') {
      return new GearMetadata(hexRegistryOrMeta).createType(typeIndexOrMessageType, payload).toHex();
    } else {
      return CreateType.create(typeIndexOrMessageType, payload, hexRegistryOrMeta).toHex();
    }
  }
}

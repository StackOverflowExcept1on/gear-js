import { hexToU8a, isHex, isU8a } from '@polkadot/util';
import { Codec } from '@polkadot/types/types';
import { HexString } from '@polkadot/util/types';

import { isProgramMeta, isStateMeta } from '../common/metadata/is';
import { CreateType } from '../common/metadata/createType';
import { GMetadata } from '../common/metadata/metadata';
import { HumanProgramMetadataRepr } from '../types';

export function getRegistry(metaOrHexRegistry: HexString): HexString {
  if (!metaOrHexRegistry) {
    return undefined;
  }

  if (isHex(metaOrHexRegistry)) {
    return metaOrHexRegistry;
  }
}

export function encodePayload<M extends GMetadata = GMetadata>(
  payload: unknown,
  hexRegistryOrMeta: HexString | M,
  type: keyof Omit<HumanProgramMetadataRepr, 'reg' | 'state' | 'signal'>,
  typeIndexOrMessageType?: number | string,
): Array<number> {
  if (payload === undefined) {
    return [];
  }

  if (isHex(payload)) {
    return Array.from(hexToU8a(payload));
  }

  if (isU8a(payload)) {
    return Array.from(payload);
  }

  if (isProgramMeta(hexRegistryOrMeta)) {
    return Array.from(hexRegistryOrMeta.createType(hexRegistryOrMeta.types[type].input, payload).toU8a());
  } else if (isStateMeta(hexRegistryOrMeta)) {
    // TODO
  } else if (isHex(hexRegistryOrMeta)) {
    if (typeof typeIndexOrMessageType === 'number') {
      return Array.from(new GMetadata(hexRegistryOrMeta).createType(typeIndexOrMessageType, payload).toU8a());
    } else {
      return Array.from((CreateType.create(typeIndexOrMessageType, payload, hexRegistryOrMeta) as Codec).toU8a());
    }
  }
  return Array.from(CreateType.create('Bytes', payload).toU8a());
}

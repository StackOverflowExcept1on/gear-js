import '@polkadot/api-augment';
export * from './base';
export * from './wasm';
export * from './create-type';
export * from './types/interfaces';
export * from './events';
export * from './utils';
export * from './events';
export * from './types';
export * from './metadata';
export * from './apis';

import { Latest, Stable, Vara } from './apis';
import { GApi } from './base';
import { GearApiOptions } from './types';

type Version = 'vara' | 'stable' | 'latest';

export function getApiClass<V extends Version = Version>(
  version: V,
  options: GearApiOptions = {},
): V extends 'vara' ? Vara.Api : V extends 'stable' ? Stable.Api : Latest.Api {
  if (version === 'stable') {
    return new GApi(options) as V extends 'vara' ? Vara.Api : V extends 'stable' ? Stable.Api : Latest.Api;
  }

  if (version === 'vara') {
    return new GApi(options) as V extends 'vara' ? Vara.Api : V extends 'stable' ? Stable.Api : Latest.Api;
  }

  return new GApi(options) as V extends 'vara' ? Vara.Api : V extends 'stable' ? Stable.Api : Latest.Api;
}

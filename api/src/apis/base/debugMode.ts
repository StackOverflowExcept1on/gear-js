import { SubmittableExtrinsic, UnsubscribePromise } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';

import { DebugDataSnapshot } from '../../types';
import GTransaction from './transaction';

declare class GDebugMode extends GTransaction {
  enabled: SubmittableExtrinsic<'promise', ISubmittableResult>;

  enable(): void;

  disable(): void;

  snapshots(callback: (event: DebugDataSnapshot) => void | Promise<void>): UnsubscribePromise;
}

export default GDebugMode;

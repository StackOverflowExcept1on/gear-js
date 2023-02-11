import { SubmittableExtrinsic, UnsubscribePromise } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';

import { Base } from '../apis';
import { DebugDataSnapshot } from '../types';
import { GTransaction } from './transaction';

export class GDebugMode extends GTransaction implements Base.GDebugMode {
  enabled: SubmittableExtrinsic<'promise', ISubmittableResult>;

  enable() {
    this.enabled = this._api.tx.sudo.sudo(this._api.tx.gearDebug.enableDebugMode(true));
  }

  disable() {
    this.enabled = this._api.tx.sudo.sudo(this._api.tx.gearDebug.enableDebugMode(false));
  }

  snapshots(callback: (event: DebugDataSnapshot) => void | Promise<void>): UnsubscribePromise {
    return this._api.query.system.events((events) => {
      events
        .filter(({ event }) => this._api.events.gearDebug.DebugDataSnapshot.is(event))
        .forEach(({ event }) => callback(event as DebugDataSnapshot));
    });
  }
}

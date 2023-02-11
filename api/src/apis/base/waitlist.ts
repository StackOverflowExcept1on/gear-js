import { HexString } from '@polkadot/util/types';

import GApi from './api';
import { WaitlistItem } from '../../types';

declare class GWaitlist {
  constructor(_api: GApi);

  readById(programId: HexString, messageId: HexString): Promise<WaitlistItem[]>;

  read(programId: HexString, numberOfMessages: number): Promise<WaitlistItem[]>;
}

export default GWaitlist;

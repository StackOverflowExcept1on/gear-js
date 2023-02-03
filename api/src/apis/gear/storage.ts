import { HexString } from '@polkadot/util/types';

import { ActiveProgram, IGearPages } from '../../types';
import Api from './api';
import { GStorage } from '../../base';

export declare class Storage extends GStorage {
  constructor(_api: Api);

  /**
   * Get program from chain
   * @param programId
   * @returns
   */
  getProgram(programId: HexString): Promise<ActiveProgram>;

  /**
   * Get list of pages for program
   * @param programId
   * @param gProg
   * @returns
   */
  getProgramPages(programId: HexString, program: ActiveProgram): Promise<IGearPages>;
}

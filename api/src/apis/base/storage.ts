import { HexString } from '@polkadot/util/types';

import { ActiveProgram, IGearPages } from '../../types';
import GApi from './api';

declare class GProgramStorage {
  constructor(_api: GApi);

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

export default GProgramStorage;

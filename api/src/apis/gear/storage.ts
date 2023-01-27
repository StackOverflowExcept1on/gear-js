import { ActiveProgram, Hex, IGearPages } from '../../types';
import Api from './gear';
import { GStorage } from '../../base';

export declare class Storage extends GStorage {
  constructor(_api: Api);

  /**
   * Get program from chain
   * @param programId
   * @returns
   */
  gProg(programId: Hex): Promise<ActiveProgram>;

  /**
   * Get list of pages for program
   * @param programId
   * @param gProg
   * @returns
   */
  gPages(programId: Hex, gProg: ActiveProgram): Promise<IGearPages>;
}

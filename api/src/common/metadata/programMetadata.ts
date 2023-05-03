import { HumanProgramMetadataRepr, ProgramMetadataRepr } from '../../types';
import { CreateType } from './createType';
import { GMetadata } from './metadata';

export class ProgramMetadata extends GMetadata {
  public types: Omit<HumanProgramMetadataRepr, 'reg'>;

  constructor({ reg, ...types }: HumanProgramMetadataRepr) {
    super(reg);
    this.types = types;
  }
}

export function getProgramMetadata(hexMetadata: string): ProgramMetadata {
  if (!hexMetadata.startsWith('0x')) {
    hexMetadata = '0x' + hexMetadata;
  }
  const metaRepr = CreateType.create<ProgramMetadataRepr>('ProgramMetadataRepr', hexMetadata).toJSON();
  return new ProgramMetadata(metaRepr);
}

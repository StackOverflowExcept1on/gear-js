import { ProgramMetadata } from './programMetadata';
import { StateMetadata } from './stateMetadata';

export function isProgramMeta(arg: unknown): arg is ProgramMetadata {
  return arg instanceof ProgramMetadata;
}

export function isStateMeta(arg: unknown): arg is StateMetadata {
  return arg instanceof StateMetadata;
}

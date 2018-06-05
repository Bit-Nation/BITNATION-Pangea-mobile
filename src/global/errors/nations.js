import type { EditingNationType } from '../../types/Nation';

export class NationAlreadySubmitted extends Error {
  transKey: string = 'nation.alreadySubmitted';
}

export class StateMutateNotPossible extends Error {
  transKey: string = 'nation.stateMutateNotPossible';
}

export class InvalidPasswordError extends Error {
  transKey: string = 'invalidPassword';
}

export class SaveDraftFailed extends Error {
  transKey: string = 'invalidPassword';
}

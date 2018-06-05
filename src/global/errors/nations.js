export class NationAlreadySubmitted extends Error {
  transKey: string = 'nation.alreadySubmitted';
}

export class StateMutateNotPossible extends Error {
  transKey: string = 'nation.stateMutateNotPossible';
}

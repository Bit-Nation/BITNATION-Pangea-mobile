export class GeneralError extends Error {
  transKey: string = 'generalError';
}

export class CancelledError extends Error {
  isCancelled = true;
}

export class DatabaseWriteFailed extends Error {
  transKey: string = 'systemError.databaseWriteFailed';

  error: Error;

  constructor(error: Error) {
    super();

    this.error = error;
  }
}


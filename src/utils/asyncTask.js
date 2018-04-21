// @flow

export type AsyncTask<T> = {
  inProgress: boolean,
  result: T | null,
  error: Error | null,
}

export default class Builder<T> {
  static success(result: T): AsyncTask<T> {
    return {
      inProgress: false,
      result,
      error: null,
    };
  }

  static failure(error: Error): AsyncTask<T> {
    return {
      inProgress: false,
      result: null,
      error,
    };
  }

  static pending(): AsyncTask<T> {
    return {
      inProgress: true,
      result: null,
      error: null,
    };
  }

  static empty(): AsyncTask<T> {
    return {
      inProgress: false,
      result: null,
      error: null,
    };
  }
}


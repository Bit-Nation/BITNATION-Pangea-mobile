// @flow

/**
 * @desc That type is used for standardize asynchronous action current status handling.
 * You should use it as a state field for asynchronous task which status should be saved in state.
 * For example, if you start loading, then you have async task with inProgress equals true, so you can show loading.
 * Once it's completed, update it with corresponding status.
 *
 * Motivation is that when using sagas for async actions you need somehow handle three state - loading, failed and success.
 * AsyncTask type provides unified style for that.
 */
export type AsyncTask<T> = {
  inProgress: boolean,
  result: T | null,
  error: Error | null,
}

/**
 * @desc Helper class for common async task states. It's likely, that you won't need anything except that four cases.
 */
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


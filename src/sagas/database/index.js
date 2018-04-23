// @flow

import type { Realm } from 'realm';
import { eventChannel, type Channel } from 'redux-saga';

type Update<T> = {
  collection: Realm.Collection<T>,
  changes: Realm.CollectionChangeSet<T>,
}

/**
 * Creates an event channel for Realm.Results updates. Emits an Update object.
 * @param {Realm.Results<T>} results Results to add notification to.
 * @return {Channel<Update<T>>} A channel.
 */
export function createDatabaseUpdateChannel<T>(results: Realm.Results<T>): Channel<Update<T>> {
  return eventChannel((emit) => {
    const handler = (collection: Realm.Collection<T>, changes: Realm.CollectionChangeSet<T>) => {
      emit({ collection, changes });
    };

    results.addListener(handler);

    return () => results.removeListener(handler);
  });
}

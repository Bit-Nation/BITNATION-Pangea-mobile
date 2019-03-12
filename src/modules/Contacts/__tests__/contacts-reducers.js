// @flow

import reducer, { initialState } from '../contacts-reducers';
import {
  startContactsFetch,
  contactsUpdated,
  addContact,
  contactsFetchFailed,
} from '../contacts-actions';

describe('contacts reducer action handling', () => {
  const callbackMock = jest.fn();
  const profileMock = {
    profile: {
      name: 'Name',
      location: 'Location',
      image: 'Image',
      identityKey: 'Sample',
      ethereumAddress: '0xtestaddress',
      ethereumPublicKey: 'key',
      chatIdKey: 'chatKey',
      timestamp: new Date(),
      version: 1,
      identityKeySignature: 'Sample Signature',
      ethereumKeySignature: 'Sample Key Signature',
    },
  };

  const contacts = [profileMock];

  test('startContactsFetch', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, startContactsFetch());
    expect(stateAfter).toEqual({
      ...stateBefore,
      isFetching: true,
      fetchError: null,
    });
  });

  test('contactsFetchFailed', () => {
    const errorMock = new Error('MOCK: Contact fetch failed');
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, contactsFetchFailed(errorMock));
    expect(stateAfter).toEqual({
      ...stateBefore,
      isFetching: false,
      fetchError: errorMock,
    });
  });

  test('contactsUpdated', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, contactsUpdated(contacts));
    expect(stateAfter).toEqual({
      ...stateBefore,
      isFetching: false,
      contacts: [profileMock],
      fetchError: null,
    });
  });

  test('addContact', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, addContact('sample', callbackMock));
    expect(stateAfter).toEqual({
      ...stateBefore,
    });
  });
});

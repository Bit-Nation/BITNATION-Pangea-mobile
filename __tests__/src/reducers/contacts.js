import reducer, { initialState } from '../../../src/reducers/contacts';
import {
  startContactsFetch,
  contactsUpdated,
  addContact,
} from '../../../src/actions/contacts';
import { servicesDestroyed } from '../../../src/actions/serviceContainer';

describe('contacts reducer action handling', () => {
  const mockAddress = '0xtestaddress';
  const callbackMock = jest.fn();
  const contactsMock = {
    name: 'Name',
    location: 'Location',
    identityKey: 'Sample',
    ethereumAddress: mockAddress,
    ethereumPublicKey: 'key',
    chatIdKey: 'chatKey',
    timestamp: null,
    version: null,
    identityKeySignature: 'Sample Signature',
  };

  test('after service destroy returns initial state', () => {
    const changedState = reducer(initialState, startContactsFetch());
    expect(reducer(changedState, servicesDestroyed())).toEqual(initialState);
  });

  test('startContactsFetch', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, startContactsFetch());
    expect(stateAfter).toEqual({
      ...stateBefore,
      isFetching: true,
      fetchError: null,
    });
  });

  test('contactsUpdated', () => {
    const stateBefore = initialState;
    const stateAfter = reducer(stateBefore, contactsUpdated([contactsMock]));
    expect(stateAfter).toEqual({
      ...stateBefore,
      isFetching: false,
      contacts: [contactsMock],
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

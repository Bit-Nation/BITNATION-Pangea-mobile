import {
  START_CONTACTS_FETCH,
  CONTACTS_UPDATED,
  ADD_CONTACT,
  startContactsFetch,
  contactsUpdated,
  addContact,
} from '../../../src/actions/contacts';

describe('contacts action creators', () => {
  test('startContactsFetch', () => {
    expect(startContactsFetch()).toEqual({
      type: START_CONTACTS_FETCH,
    });
  });

  test('contactsUpdated', () => {
    const mockAddress = '0xtestaddress';
    const profileMock = {
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
    expect(contactsUpdated([profileMock])).toEqual({
      type: CONTACTS_UPDATED,
      contacts: [profileMock],
    });
  });

  test('addContact', () => {
    const callbackMock = jest.fn();
    expect(addContact('sample', callbackMock)).toEqual({
      type: ADD_CONTACT,
      identityKey: 'sample',
      callback: callbackMock,
    });
  });
});

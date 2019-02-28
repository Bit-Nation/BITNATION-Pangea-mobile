// @flow

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

    expect(contactsUpdated(contacts)).toEqual({
      type: CONTACTS_UPDATED,
      contacts,
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

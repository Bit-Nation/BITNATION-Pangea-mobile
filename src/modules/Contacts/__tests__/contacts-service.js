// @flow

import ContactsService from '../contacts-service';
import * as Panthalassa from '@pangea/panthalassa';

const mockIdentityKey = 'MOCK_IDENTITY_KEY';
const mockIdentityKey2 = 'MOCK_IDENTITY_KEY_2';

// $FlowExpectedError
Panthalassa.panthalassaCall = jest.fn((command) => {
  switch (command) {
    case 'CONTACT:ALL':
      return JSON.stringify({
        contacts: [
          { identity_key: mockIdentityKey },
          { identity_key: mockIdentityKey2 },
        ],
      });
    default:
      return null;
  }
});

test('getContacts', async () => {
  expect.assertions(1);

  expect(await ContactsService.getContacts()).toEqual([
    { identity_key: mockIdentityKey },
    { identity_key: mockIdentityKey2 },
  ]);
});

test('addContact', async () => {
  expect.assertions(2);

  expect(await ContactsService.addContact(mockIdentityKey)).toEqual();
  expect(Panthalassa.panthalassaCall).toBeCalledWith('CONTACT:CREATE', { identity_key: mockIdentityKey });
});

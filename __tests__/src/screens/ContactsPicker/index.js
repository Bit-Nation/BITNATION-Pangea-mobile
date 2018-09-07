import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ContactsPickerScreen from '../../../../src/screens/PrivateChat/ContactsPicker';

describe('ContactsPickerScreen', () => {
  let contactsPickerScreen;

  const initialStateMock = {
    contacts: {
      contacts: []
    }
  };
  const storeMock = configureStore([]);
  const propsMock = {
  };

  beforeEach(() => {
    contactsPickerScreen = shallow(<ContactsPickerScreen {...propsMock} store={storeMock(initialStateMock)} />);
  });

  test('Rendering', () => {
    expect(contactsPickerScreen).toMatchSnapshot();
  });
});

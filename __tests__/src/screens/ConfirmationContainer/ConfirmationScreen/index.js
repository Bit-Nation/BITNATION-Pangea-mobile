import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationScreen from '../../../../../src/screens/ConfirmationContainer/ConfirmationScreen';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('ConfirmationScreen', () => {
  let confirmationScreen;
  const propsMock = {
    gasPrice: 2,
    navigator: navigatorMock,
  };

  beforeEach(() => {
    confirmationScreen = shallow(<ConfirmationScreen {...propsMock} />);
  });

  test('Rendering', () => {
    expect(confirmationScreen).toMatchSnapshot();
  });
});

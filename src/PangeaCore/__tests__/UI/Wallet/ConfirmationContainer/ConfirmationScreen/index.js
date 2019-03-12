// @flow

import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationScreen from '../../../../../UI/Wallet/ConfirmationContainer/ConfirmationScreen';
import navigatorMock from '../../../../../__mocks__/Navigator';

describe('ConfirmationScreen', () => {
  let confirmationScreen;
  const propsMock = {
    gasPrice: 2,
    navigator: navigatorMock,
    amount: '0',
    estimate: '0',
    gasLimit: 21000,
  };

  beforeEach(() => {
    confirmationScreen = shallow(<ConfirmationScreen {...propsMock} />);
  });

  test('Rendering', () => {
    expect(confirmationScreen).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationScreen from '../../../../../src/screens/ConfirmationContainer/ConfirmationScreen';

describe('ConfirmationScreen', () => {
  let confirmationScreen;
  const propsMock = {
    gasPrice: 2,
  };

  beforeEach(() => {
    confirmationScreen = shallow(<ConfirmationScreen {...propsMock} />);
  });

  test('Rendering', () => {
    expect(confirmationScreen).toMatchSnapshot();
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import PanelViewAlert from '../../../../src/components/common/PanelViewAlert';

describe('PanelViewAlert tests', () => {
  describe('Rendering', () => {
    test('With title and button', () => {
      const wrapper = shallow(<PanelViewAlert status='Test panel status' />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

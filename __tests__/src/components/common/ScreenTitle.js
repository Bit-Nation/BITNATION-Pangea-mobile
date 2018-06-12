import React from 'react';
import { shallow } from 'enzyme';
import ScreenTitle from '../../../../src/components/common/ScreenTitle';

describe('ScreenTitle tests', () => {
  describe('Rendering', () => {
    test('Testing correct rendering', () => {
      const wrapper = shallow(<ScreenTitle title='Test title' />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import PanelViewCitizen from '../../UI/PanelViewCitizen';

describe('PanelViewCitizen tests', () => {
  describe('Rendering', () => {
    test('Testing correct rendering', () => {
      const wrapper = shallow(<PanelViewCitizen status='Test of Nation Name' />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

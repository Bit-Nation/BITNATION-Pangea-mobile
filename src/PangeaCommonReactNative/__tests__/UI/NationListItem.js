import React from 'react';
import { shallow } from 'enzyme';

import NationListItem from '../../../../src/components/common/NationListItem';
import { statusColor } from '../../../../src/utils/nations';

describe('NationListItem tests', () => {
  describe('Rendering', () => {
    test('With text', () => {
      const wrapper = shallow(<NationListItem text='Test list item' />);
      expect(wrapper).toMatchSnapshot();
    });

    test('With text colors', () => {
      const wrapper = shallow(<NationListItem
        text='Test list item'
        statusColor={statusColor(0)}
      />);
      expect(wrapper).toMatchSnapshot();
    });

    test('Default has onPress', () => {
      expect(NationListItem.defaultProps.onPress).toBeDefined();
    });
  });

  describe('Behaviour', () => {
    test('Press', () => {
      const mockFunc = jest.fn();
      const id = 'Test id';
      const wrapper = shallow(<NationListItem text='Test list item' onPress={mockFunc} id={id} />);
      expect(wrapper).toMatchSnapshot();
      const render = wrapper.dive();
      const touchables = render.find('[testID="Touchable"]');
      expect(touchables).toHaveLength(1);
      touchables.props().onPress();
      expect(mockFunc).toHaveBeenCalledTimes(1);
      expect(mockFunc).toHaveBeenCalledWith(id);
    });
  });
});


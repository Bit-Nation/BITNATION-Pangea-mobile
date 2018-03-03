import React from 'react';
import { shallow } from 'enzyme';

import ChatListItem from '../../../../src/components/common/ChatListItem';

describe('ChatListItem tests', () => {
  describe('Rendering', () => {
    test('With text', () => {
      const wrapper = shallow(<ChatListItem text='Test list item' />);
      expect(wrapper).toMatchSnapshot();
    });

    test('With text colors', () => {
      const wrapper = shallow(<ChatListItem
        text='Test chat list item'
      />);
      expect(wrapper).toMatchSnapshot();
    });

    test('Default has onPress', () => {
      const wrapper = shallow(<ChatListItem />);
      expect(wrapper.instance().props.onPress).toBeDefined();
    });
  });

  describe('Behaviour', () => {
    test('Press', () => {
      const mockFunc = jest.fn();
      const id = 'Test id';
      const wrapper = shallow(<ChatListItem text='Test list item' onPress={mockFunc} id={id} />);
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


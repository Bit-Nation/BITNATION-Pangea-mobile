// @flow

import React from 'react';
import { shallow } from 'enzyme';

import ChatListItem from '../../UI/ChatListItem';

describe('ChatListItem tests', () => {
  describe('Rendering', () => {
    test('With text', () => {
      const wrapper = shallow(<ChatListItem
        id={1}
        name='Test list item'
        lastMessage='Some message'
        unreadMessages={false}
        onPress={jest.fn()}
      />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour', () => {
    test('Press', () => {
      const mockFunc = jest.fn();
      const id = 1;
      const wrapper = shallow(<ChatListItem
        unreadMessages={false}
        name='Test list item'
        onPress={mockFunc}
        id={id}
      />);
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


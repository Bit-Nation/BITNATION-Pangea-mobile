import React from 'react';
import { shallow } from 'enzyme';

import ChatListItem from '../../../../src/components/common/ChatListItem';
import AssetsImages from '../../../../src/global/AssetsImages';

describe('ChatListItem tests', () => {
  describe('Rendering', () => {
    test('With text', () => {
      const wrapper = shallow(<ChatListItem text='Test list item' />);
      expect(wrapper).toMatchSnapshot();
    });

    test('With different texts and icon', () => {
      const wrapper = shallow(<ChatListItem
        text='Test chat list item'
        participants='Text'
        itemIcon={AssetsImages.ChatUI.signal0}
        profileImage=''
      />);
      expect(wrapper).toMatchSnapshot();
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


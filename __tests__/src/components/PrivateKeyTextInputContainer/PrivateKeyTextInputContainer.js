/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { TextInput } from 'react-native';

import PrivateKeyTextInputContainer from '../../../../src/components/PrivateKeyTextInputContainer';

describe('PrivateKeyTextInputContainer component tests', () => {
  describe('rendering', () => {
    test('default', () => {
      const tree = renderer.create(<PrivateKeyTextInputContainer />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('custom style', () => {
      const tree = renderer.create(<PrivateKeyTextInputContainer style={{ flex: 1 }} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('isLast prop', () => {
      let wrapper = shallow((
        <PrivateKeyTextInputContainer
          index={0}
          label='Test label'
          value='Test value'
          isLast={false}
          editable
        />
      ));
      expect(wrapper).toMatchSnapshot();
      const render = wrapper.root();
      wrapper = render.setProps({ isLast: true });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('behaviour', () => {
    test('onChange works', () => {
      const mockFunc = jest.fn();
      const mockValue = 'test value';
      const mockIndex = 7;
      const wrapper = shallow(<PrivateKeyTextInputContainer
        index={mockIndex}
        onChange={mockFunc}
      />);
      const render = wrapper.root();
      render.find(TextInput).forEach(child => child.props().onChangeText(mockValue));
      expect(mockFunc).toHaveBeenCalledTimes(1);
      expect(mockFunc).toHaveBeenCalledWith(mockIndex, mockValue);
    });

    test('onSubmit works', () => {
      const mockFunc = jest.fn();
      const mockIndex = 7;
      const wrapper = shallow(<PrivateKeyTextInputContainer
        index={mockIndex}
        onSubmit={mockFunc}
      />);
      const render = wrapper.root();
      render.find(TextInput).forEach(child => child.props().onSubmitEditing());
      expect(mockFunc).toHaveBeenCalledTimes(1);
      expect(mockFunc).toHaveBeenCalledWith(mockIndex);
    });

    test('onFocus works', () => {
      const mockFunc = jest.fn();
      const mockIndex = 7;
      const wrapper = shallow(<PrivateKeyTextInputContainer
        index={mockIndex}
        onFocus={mockFunc}
      />);
      const render = wrapper.root();
      render.find(TextInput).forEach(child => child.props().onFocus({}));
      expect(mockFunc).toHaveBeenCalledTimes(1);
      expect(mockFunc).toHaveBeenCalledWith(mockIndex, null);
    });
  });
});

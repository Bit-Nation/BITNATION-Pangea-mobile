import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme/build/index';
import { TouchableOpacity } from 'react-native';
import NationActionButton from '../../../../src/components/common/NationActionButton';
import AssetsImage from '../../../../src/global/AssetsImages';

describe('NationActionButton component tests', () => {
  test('NationActionButton renders correctly', () => {
    const tree =
      renderer.create(<NationActionButton
        iconSource={AssetsImage.Actions.chat}
        title='Chat'
        disable
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('NationActionButton press works', () => {
    const onPress = jest.fn();
    const wrapper =
      shallow(<NationActionButton
        onPress={onPress}
        enabled
      />);
    expect(wrapper).toMatchSnapshot();
    const render = wrapper.dive();
    render.find(TouchableOpacity).simulate('press');
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('NationActionButton press enabled', () => {
    const onPress = jest.fn();
    const wrapper =
      shallow(<NationActionButton
        onPress={onPress}
        disable={false}
        iconSource={AssetsImage.Actions.chat}
        title='TEST'
      />);
    expect(wrapper).toMatchSnapshot();
    const render = wrapper.dive();
    render.find(TouchableOpacity).simulate('press');
    expect(render.props().disable).toBeFalsy();
  });
});

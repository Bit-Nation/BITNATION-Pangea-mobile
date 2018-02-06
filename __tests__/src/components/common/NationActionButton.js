import NationActionButton from '../../../../src/components/common/NationActionButton';
import React from 'react';
import renderer from 'react-test-renderer'
import AssetsImage from "../../../../src/global/AssetsImages";
import {shallow} from "enzyme/build/index";
import {TouchableOpacity} from "react-native";

describe('NationActionButton component tests', () => {

  test('NationActionButton renders correctly', () => {
    const tree = renderer.create(<NationActionButton
      iconSource={AssetsImage.Actions.chat}
      title='Chat' disable={true}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('NationActionButton press works', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <NationActionButton onPress={onPress} enabled={true}/>
    );
    expect(wrapper).toMatchSnapshot();
    const render = wrapper.dive();
    render.find(TouchableOpacity).simulate('press');
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('NationActionButton press disabled', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <NationActionButton onPress={onPress} disable={true}/>
    );
    expect(wrapper).toMatchSnapshot();
    const render = wrapper.dive();
    render.find(TouchableOpacity).simulate('press');
    expect(render.props().disable).toBeTruthy();
  });

  test('NationActionButton press enabled', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <NationActionButton
        onPress={onPress}
        disable={false}
        iconSource={AssetsImage.Actions.chat}
        title='TEST'
      />
    );
    expect(wrapper).toMatchSnapshot();
    const render = wrapper.dive();
    render.find(TouchableOpacity).simulate('press');
    expect(render.props().disable).toBeFalsy();
  });

});
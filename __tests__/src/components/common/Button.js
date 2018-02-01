import React from 'react';
import { TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Button from '../../../../src/components/common/Button';

describe('Button component tests', () => {

  test('Renders correctly', () => {
    const tree = renderer.create(<Button/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Press works', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <Button onPress={onPress} enabled={true}/>
    );
    expect(wrapper).toMatchSnapshot();
    const render = wrapper.dive();
    render.find(TouchableOpacity).simulate('press');
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
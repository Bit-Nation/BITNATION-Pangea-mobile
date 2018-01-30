import React from 'react';
import { TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import Button from '../../../../src/components/common/Button';

describe('Testing Button component', () => {
  test('Press works', () => {
    const onPress = jest.fn();
    const wrapper = shallow(
      <Button onPress={onPress} enabled={true}/>
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate('press');
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
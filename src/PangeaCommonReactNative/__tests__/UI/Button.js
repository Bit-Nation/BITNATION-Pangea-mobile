import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import Button from '../../UI/Button';

describe('Button component tests', () => {
  describe('Rendering', () => {
    test('Default', () => {
      const wrapper = shallow(<Button />);
      expect(wrapper).toMatchSnapshot();
    });

    test('Enabled', () => {
      const wrapper = shallow(<Button enabled />);
      expect(wrapper).toMatchSnapshot();
    });

    test('Disabled', () => {
      const wrapper = shallow(<Button enabled={false} />);
      expect(wrapper).toMatchSnapshot();
    });

    test('Enabled with title', () => {
      const wrapper = shallow(<Button enabled title='Testing title' />);
      expect(wrapper).toMatchSnapshot();
    });

    test('Disabled with title', () => {
      const wrapper = shallow(<Button enabled={false} title='Testing title' />);
      expect(wrapper).toMatchSnapshot();
    });

    test('Enabled with children', () => {
      const wrapper = shallow((
        <Button enabled>
          <Text>
            Custom text inside button
          </Text>
        </Button>
      ));
      expect(wrapper).toMatchSnapshot();
    });

    test('Disabled with children', () => {
      const wrapper = shallow((
        <Button enabled={false}>
          <Text>
            Custom text inside button
          </Text>
        </Button>
      ));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour', () => {
    test('Press works', () => {
      const onPress = jest.fn();
      const wrapper = shallow(<Button onPress={onPress} enabled />);
      expect(wrapper).toMatchSnapshot();
      const render = wrapper.dive();
      const touchables = render.find('[testID="Touchable"]');
      expect(touchables).toHaveLength(1);
      touchables.simulate('press');
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    test('Press does not work when button is disabled', () => {
      const onPress = jest.fn();
      const wrapper = shallow(<Button onPress={onPress} enabled={false} />);
      expect(wrapper).toMatchSnapshot();
      const render = wrapper.dive();
      const touchables = render.find('[testID="Touchable"]');
      expect(touchables).toHaveLength(1);
      expect(touchables.props()).toEqual(expect.objectContaining({ disabled: true }));
    });
  });
});

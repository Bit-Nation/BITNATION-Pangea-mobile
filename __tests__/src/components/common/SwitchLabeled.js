import SwitchLabeled from '../../../../src/components/common/SwitchLabeled';
import React from 'react';
import renderer from 'react-test-renderer'
import {shallow} from "enzyme/build/index";

describe('SwitchLabeled component tests', () => {

  describe('SwitchLabeled rendering', () => {

    test('SwitchLabeled renders correctly', () => {
      const tree = renderer.create(
        <SwitchLabeled
          label={'Testing SwitchLabeled'}
        />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('SwitchLabeled renders correctly with set value', () => {
      const tree = renderer.create(
        <SwitchLabeled
          label={'Testing SwitchLabeled'}
          value={true}
        />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });

  describe('SwitchLabeled behaviour', () => {

    test('SwitchLabeled setup to be true', () => {
      const tree = renderer.create(
        <SwitchLabeled
          label={'Testing SwitchLabeled'}
          value={true}
        />
      );
      expect(tree.root.props.value).toBeTruthy();
    });

    test('SwitchLabeled setup to be false', () => {
      const tree = renderer.create(
        <SwitchLabeled
          label={'Testing SwitchLabeled'}
          value={false}
        />
      );
      expect(tree.root.props.value).toBeFalsy();
    });

    test('SwitchLabeled change of value', () => {
      const onValueChange = jest.fn();
      const wrapper  = shallow(<SwitchLabeled
        onValueChange={onValueChange}
        label={'Testing for change value'}
        value={false}
      />);

      const render = wrapper.dive();
      const value = render.find('Switch');
      render.find('Switch').forEach(child => {
        child.simulate('valueChange');
      });
      expect(onValueChange).toBeCalled();
    });

  });

});
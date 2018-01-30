import SwitchLabeled from '../../../../src/components/common/SwitchLabeled';
import React from 'react';
import renderer from 'react-test-renderer'
import Strings from "../../../../src/global/Strings";

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
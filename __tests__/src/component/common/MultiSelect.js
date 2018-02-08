import MultiSelect from '../../../../src/components/MultiSelect';
import React from 'react';
import renderer from 'react-test-renderer'
import Colors from "../../../../src/global/Colors";

test('MultiSelect renders correctly', () => {
  const tree = renderer.create(
    <MultiSelect
      hideTags
      items={[{
        id: 'id1',
        name: 'Testing Opt 1',
      }, {
        id: 'id2',
        name: 'Testing Opt 2',
      }]}
      uniqueKey='id'
      submitButtonText={'OK'}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('MultiSelect renders correctly with customized colors', () => {
  const tree = renderer.create(
    <MultiSelect
      hideTags
      items={[{
        id: 'id1',
        name: 'Testing Opt 1',
      }, {
        id: 'id2',
        name: 'Testing Opt 2',
      }]}
      uniqueKey='id'
      tagRemoveIconColor='#CCC'
      tagBorderColor='#CCC'
      tagTextColor='#CCC'
      itemTextColor={Colors.textSecondary}
      displayKey='name'
      submitButtonColor={Colors.panelBoxColor}
      submitButtonText={'OK'}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
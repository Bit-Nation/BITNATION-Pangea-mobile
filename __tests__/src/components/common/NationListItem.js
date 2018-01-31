import React from 'react';
import renderer from 'react-test-renderer';

import NationListItem from '../../../../src/components/common/NationListItem';

test('NationListItem renders correctly', () => {
  const tree = renderer
    .create(<NationListItem text='Test list item'/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

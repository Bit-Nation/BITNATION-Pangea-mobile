import React from 'react';
import renderer from 'react-test-renderer';

import NationListHeader from '../../UI/ItemsListHeader';

test('ItemsListHeader renders correctly', () => {
  const tree = renderer
    .create(<NationListHeader title='Test header title' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

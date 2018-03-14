import React from 'react';
import renderer from 'react-test-renderer';

import NationListHeader from '../../../../src/components/common/NationListHeader';

test('NationListHeader renders correctly', () => {
  const tree = renderer
    .create(<NationListHeader title='Test header title' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

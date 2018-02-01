import React from 'react';
import renderer from 'react-test-renderer';

import FakeNavigationBar from '../../../../src/components/common/FakeNavigationBar';

test('FakeNavigationBar renders correctly', () => {
  const tree = renderer
    .create(<FakeNavigationBar/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

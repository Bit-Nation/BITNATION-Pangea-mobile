import React from 'react';
import renderer from 'react-test-renderer';

import FakeNavigationBar from '../../UI/FakeNavigationBar';

test('FakeNavigationBar renders correctly', () => {
  const tree = renderer
    .create(<FakeNavigationBar />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';

import BackgroundImage from '../../UI/BackgroundImage';

test('BackgroundImage renders correctly', () => {
  const tree = renderer
    .create(<BackgroundImage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

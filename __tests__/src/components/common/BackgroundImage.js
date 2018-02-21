import React from 'react';
import renderer from 'react-test-renderer';

import BackgroundImage from '../../../../src/components/common/BackgroundImage';

test('BackgroundImage renders correctly', () => {
  const tree = renderer
    .create(<BackgroundImage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

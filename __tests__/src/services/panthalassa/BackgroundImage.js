import React from 'react';
import BackgroundImage from '../../../../src/components/common/BackgroundImage';

import renderer from 'react-test-renderer';

test('BackgroundImage renders correctly', () => {
  const tree = renderer
    .create(<BackgroundImage/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

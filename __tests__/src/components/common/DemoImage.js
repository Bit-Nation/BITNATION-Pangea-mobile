import React from 'react';
import renderer from 'react-test-renderer';

import DemoImage from '../../../../src/components/common/DemoImage';

test('DemoImage renders correctly', () => {
  const tree = renderer
    .create(<DemoImage/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

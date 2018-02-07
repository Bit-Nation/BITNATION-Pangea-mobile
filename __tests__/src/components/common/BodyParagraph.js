import React from 'react';
import renderer from 'react-test-renderer';

import BodyParagraph from '../../../../src/components/common/BodyParagraph';

test('BodyParagraph renders correctly', () => {
  const tree = renderer
    .create(<BodyParagraph text='Test text'/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

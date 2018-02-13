import React from 'react';
import renderer from 'react-test-renderer';

import BodyParagraphs from '../../../../src/components/common/BodyParagraphs';

describe('BodyParagraphs rendering', () => {

  test('Empty', () => {
    const tree = renderer
      .create(<BodyParagraphs paragraphs={[]}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('With one paragraph', () => {
    const tree = renderer
      .create(<BodyParagraphs paragraphs={['Test text']}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('With multiple paragraphs', () => {
    const tree = renderer
      .create(<BodyParagraphs paragraphs={['Test text1', 'Test text2', 'Test text3', 'Test text4']}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

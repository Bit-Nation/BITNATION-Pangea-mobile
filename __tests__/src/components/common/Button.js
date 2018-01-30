import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../../../../src/components/common/Button';

describe('Button rendering', () => {

  test('Default button', () => {
    const tree = renderer
      .create(<Button/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Button with title', () => {
    const tree = renderer
      .create(<Button title='Test title'/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Disabled button with title', () => {
    const tree = renderer
      .create(<Button title='Test title' enabled={false}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Enabled button with title', () => {
    const tree = renderer
      .create(<Button title='Test title' enabled={true}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
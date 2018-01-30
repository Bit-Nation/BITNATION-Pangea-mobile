import React from 'react';
import renderer from 'react-test-renderer';

import PanelView from '../../../../src/components/common/PanelView';

describe('PanelView rendering', () => {

  test('Panel view with title and button', () => {
    const tree = renderer
      .create(<PanelView title='Test panel title' onButtonClick={() => null} buttonTitle='Test panel button'/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Panel view with title and body', () => {
    const tree = renderer
      .create(<PanelView title='Test panel title'
                         body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Panel view with title, body and button', () => {
    const tree = renderer
      .create(<PanelView title='Test panel title'
                         body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
                         onButtonClick={() => null}
                         buttonTitle='Test panel button'/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';

import PanelView from '../../../../src/components/common/PanelView';
import Button from '../../../../src/components/common/Button';

describe('PanelView tests', () => {
  describe('Rendering', () => {
    test('With title and button', () => {
      const wrapper = shallow(<PanelView
        title='Test panel title'
        onButtonClick={() => null}
        buttonTitle='Test panel button'
      />);
      expect(wrapper).toMatchSnapshot();
    });

    test('With title and body', () => {
      const wrapper = shallow(<PanelView
        title='Test panel title'
        body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
      />);
      expect(wrapper).toMatchSnapshot();
    });

    test('With title, body and button', () => {
      const wrapper = shallow(<PanelView
        title='Test panel title'
        body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        onButtonClick={() => null}
        buttonTitle='Test panel button'
      />);
      expect(wrapper).toMatchSnapshot();
    });

    test('With title, body and additionalInfo and button', () => {
      const wrapper = shallow(<PanelView
        title='Test panel title'
        body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        onButtonClick={() => null}
        renderAdditionalInfo={() => <Text />}
        buttonTitle='Test panel button'
      />);
      expect(wrapper).toMatchSnapshot();
    });

    test('With title, body and bottom content', () => {
      const wrapper = shallow(<PanelView
        title='Test panel title'
        body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        onButtonClick={() => null}
        renderBottom={() => <Text />}
        buttonTitle='Test panel button'
      />);
      expect(wrapper).toMatchSnapshot();
    });

    test('With children and custom container style', () => {
      const wrapper = shallow((
        <PanelView title='Test panel title' childrenContainerStyle={{ flex: 1 }}>
          <Text>Test children</Text>
        </PanelView>
      ));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Behaviour', () => {
    test('Button press', () => {
      const mockFunc = jest.fn();
      const wrapper = shallow(<PanelView onButtonClick={mockFunc} />);
      const render = wrapper.dive();
      const button = render.find(Button);
      button.simulate('press');
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });
  });
});

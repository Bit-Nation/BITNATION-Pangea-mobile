import { Navigator } from 'react-native-navigation';

import NavigatorComponent from '../../../../src/components/common/NavigatorComponent';

describe('NavigatorComponent tests', () => {
  test('NavigatorComponent passes navigation button press event', () => {
    const navigator = new Navigator();
    const component = new NavigatorComponent({ navigator });
    const mockFunc = jest.fn();
    const testButtonID = 'TEST_BUTTON_ID';
    const buttonPressMockEvent = { type: 'NavBarButtonPress', id: testButtonID };

    component.onNavBarButtonPress = mockFunc;
    navigator.onNavigatorEvent(buttonPressMockEvent);

    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc.mock.calls[0][0]).toBe(testButtonID);
  });

  /**
   * @desc Common test that checks if component called specific function on specific event id.
   * @param {string} callbackName Name of callback function
   * @param {string} id Id of event.
   * @return {void}
   */
  function componentPassesEvent(callbackName, id) {
    const navigator = new Navigator();
    const component = new NavigatorComponent({ navigator });
    const mockFunc = jest.fn();
    component[callbackName] = mockFunc;
    navigator.onNavigatorEvent({ id });
    expect(mockFunc).toHaveBeenCalledTimes(1);
  }

  test('NavigatorComponent passes will appear event', () => {
    componentPassesEvent('onWillAppear', 'willAppear');
  });

  test('NavigatorComponent passes did appear event', () => {
    componentPassesEvent('onDidAppear', 'didAppear');
  });

  test('NavigatorComponent passes will disappear event', () => {
    componentPassesEvent('onWillDisappear', 'willDisappear');
  });

  test('NavigatorComponent passes did disappear event', () => {
    componentPassesEvent('onDidDisappear', 'didDisappear');
  });

  test('NavigatorComponent passes bottom bar tab reselected event', () => {
    componentPassesEvent('onBottomTabReselected', 'bottomTabReselected');
  });
});

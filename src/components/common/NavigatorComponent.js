// @flow

import { Component } from 'react';
import type { NavigatorEvent, Navigator } from '../../types/ReactNativeNavigation';

type NavigatorProps = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
}

/**
 * @desc Component that handles events from react-native-navigation and passes it as functions
 * to override.
 * @example
 * class ScreenComponent extends NavigatorComponent {
 *
 *   onDidAppear() {
 *     console.log('Screen appears on screen!');
 *   }
 *
 * }
 * @note Don't forget to call super if you override constructor or onNavigatorEvent method of
 * that class.
 */
export default class NavigatorComponent<Props, State = void>
  extends Component<Props & NavigatorProps, State> {
  constructor(props: Props & NavigatorProps) {
    super(props);

    const { navigator } = this.props;

    if (navigator) {
      navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
  }

  onNavigatorEvent(event: NavigatorEvent) {
    if (event.type === 'NavBarButtonPress') {
      if (typeof this.onNavBarButtonPress === 'function') {
        this.onNavBarButtonPress(event.id);
      }
    }
    switch (event.id) {
      case 'willAppear':
        if (typeof this.onWillAppear === 'function') {
          this.onWillAppear();
        }
        break;
      case 'didAppear':
        if (typeof this.onDidAppear === 'function') {
          this.onDidAppear();
        }
        break;
      case 'willDisappear':
        if (typeof this.onWillDisappear === 'function') {
          this.onWillDisappear();
        }
        break;
      case 'didDisappear':
        if (typeof this.onDidDisappear === 'function') {
          this.onDidDisappear();
        }
        break;
      case 'bottomTabReselected':
        if (typeof this.onBottomTabReselected === 'function') {
          this.onBottomTabReselected();
        }
        break;
      default:
        break;
    }
  }
}

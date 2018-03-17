// @flow

import { Component } from 'react';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator?: any,
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
export default class NavigatorComponent extends Component<Props> {
  constructor(props: Props) {
    super(props);

    const { navigator } = this.props;

    if (navigator) {
      navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
  }

  onNavigatorEvent(event: { type: string, id: string }) {
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

import React, { Component } from 'react';

/**
 * @desc Component that handles events from react-native-navigation and passes it as functions to override.
 * @example
 * class ScreenComponent extends NavigatorComponent {
 *
 *   onDidAppear() {
 *     console.log('Screen appears on screen!');
 *   }
 *
 * }
 * @note Don't forget to call super if you override constructor or onNavigatorEvent method of that class.
 */
export default class NavigatorComponent extends Component {
  constructor(props) {
    super(props);

    const { navigator } = this.props;

    if (navigator) {
      navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      this.onNavBarButtonPress(event.id);
    }
    switch (event.id) {
      case 'willAppear':
        this.onWillAppear();
        break;
      case 'didAppear':
        this.onDidAppear();
        break;
      case 'willDisappear':
        this.onWillDisappear();
        break;
      case 'didDisappear':
        this.onDidDisappear();
        break;
      case 'bottomTabReselected':
        this.onBottomTabReselected();
        break;
    }
  }

  /**
   * @desc Method that is called when navigation button is pressed.
   * @param id ID of pressed button
   */
  onNavBarButtonPress(id: string) {
  }

  /**
   * @desc Method that is called when component is about to appear on screen.
   */
  onWillAppear() {
  }

  /**
   * @desc Method that is called when component appears on screen.
   */
  onDidAppear() {
  }

  /**
   * @desc Method that is called when component is about to disappear from screen.
   */
  onWillDisappear() {
  }

  /**
   * @desc Method that is called when component disappears from screen.
   */
  onDidDisappear() {
  }

  /**
   * @desc Method that is called when tab of bottom bar is selected twice or more time.
   */
  onBottomTabReselected() {
  }
}

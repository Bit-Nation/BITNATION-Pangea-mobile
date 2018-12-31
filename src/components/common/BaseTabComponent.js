// @flow

import React from 'react';
import { View } from 'react-native';
import NavigatorComponent from './NavigatorComponent';
import type { Navigator } from '../../types/ReactNativeNavigation';
import { screen } from '../../global/Screens';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

type State = {
  /**
   * @desc The list of selected contacts.
   */
  isAppear: boolean
};

class BaseTabComponent extends NavigatorComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAppear: false,
    };
  }

  onWillAppear() {
    this.setState({ isAppear: true });
  }

  onWillDisappear() {
    this.setState({ isAppear: false });
  }

  onHandleDeepLink(event) {
    if (this.state.isAppear) {
      const parts = event.link.split('/');
      if (parts[0] === 'push') {
        this.props.navigator.push(screen(parts[1]));
      }
    }
  }

  render() {
    return (
      <View />
    );
  }
}

export default BaseTabComponent;

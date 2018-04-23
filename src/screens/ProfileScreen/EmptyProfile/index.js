// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';
import ScreenTitle from '../../../components/common/ScreenTitle';

export type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to create a new user
   */
  onCreateUserProfile: () => void,
};

class EmptyProfileScreen extends Component<Props> {
  componentWillMount() {
    this.props.navigator.setButtons({ leftButtons: [], rightButtons: [] });
  }

  render() {
    return (
      <View style={styles.bodyContainer}>
        <ScreenTitle title={i18n.t('screens.profile.title')} />

        <PanelView
          title={i18n.t('screens.profile.empty.createProfilePanel.title')}
          body={i18n.t('screens.profile.empty.createProfilePanel.text')}
          buttonTitle={i18n.t('screens.profile.empty.createProfilePanel.button')}
          onButtonClick={this.props.onCreateUserProfile}
          style={styles.panelViewTransparent}
        />
      </View>
    );
  }
}

export default EmptyProfileScreen;

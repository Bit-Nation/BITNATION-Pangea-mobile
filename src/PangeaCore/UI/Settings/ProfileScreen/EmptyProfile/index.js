// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles';
import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import i18n from 'pangea-common/i18n';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';

export type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

class EmptyProfileScreen extends Component<Props> {
  componentWillMount() {
    this.props.navigator.setButtons({ leftButtons: [], rightButtons: [] });
  }

  render() {
    return (
      <View style={styles.bodyContainer}>
        {/* <ScreenTitle title={i18n.t('screens.profile.title')} /> */}

        <PanelView
          title={i18n.t('screens.profile.empty.createProfilePanel.title')}
          body={i18n.t('screens.profile.empty.createProfilePanel.text')}
          buttonTitle={i18n.t('screens.profile.empty.createProfilePanel.button')}
          style={styles.panelViewTransparent}
        />
      </View>
    );
  }
}

export default EmptyProfileScreen;

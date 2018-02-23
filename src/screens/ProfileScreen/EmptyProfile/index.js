import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import AssetsImage from '../../../global/AssetsImages';
import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';

class EmptyProfileScreen extends Component {
  componentWillMount() {
    this.props.navigator.setButtons({ leftButtons: [], rightButtons: [] });
  }

  render() {
    return (
      <View style={styles.bodyContainer}>
        {/* TITLE OF SCREEN */}
        <View style={styles.titleContainer}>
          <View style={styles.titleBarLarge}>
            <Text style={styles.largeTitle}>{i18n.t('screens.profile.title')}</Text>
          </View>
        </View>

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

EmptyProfileScreen.propTypes = {
  onCreateUserProfile: PropTypes.func.isRequired,
};

export default EmptyProfileScreen;

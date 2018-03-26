// @flow

import React from 'react';
import {
  Image,
  View,
  Text,
  Alert,
} from 'react-native';

import styles from './styles';
import AssetsImage from '../../../global/AssetsImages';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/colors';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import type { ProfileType } from '../../../types/Profile';
import i18n from '../../../global/i18n';

const EDIT_BUTTON = 'EDIT_BUTTON';

export type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Current user object
   */
  user: ProfileType,
  /**
   * @desc Flag that determines if testing mode is activated
   */
  testingModeActive?: boolean,
  /**
   * @desc Function to start user edit
   */
  onStartEditing: () => void,
  /**
   * @desc Function to enable testing mode
   */
  makeStepForTestingMode: () => void,
  /**
   * @desc Function to reset in testing mode
   */
  resetStepsForTestingMode: () => void,
};

class ProfileScreen extends NavigatorComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [],
      rightButtons: [{
        title: i18n.t('screens.profile.editButton'),
        id: EDIT_BUTTON,
        buttonColor: Colors.navigationButtonColor,
      }],
    });
  }

  onNavBarButtonPress(id: string): void {
    if (id === EDIT_BUTTON) {
      this.props.onStartEditing();
    }
  }

  onBottomTabReselected() {
    this.props.makeStepForTestingMode();
  }

  onDidDisappear() {
    this.props.resetStepsForTestingMode();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.testingModeActive !== this.props.testingModeActive) {
      Alert.alert(i18n.t('testingMode.changeActiveAlert.title', {
        onOff: this.props.testingModeActive ?
          i18n.t('enums.onOff.on') :
          i18n.t('enums.onOff.off'),
      }));
    }
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
        {this._buildHeader()}
      </View>
    );
  }

  _buildHeader() {
    const { user } = this.props;

    const avatarSource = user.avatar ?
      { uri: `data:image/gif;base64,${user.avatar}` } :
      AssetsImage.Placeholder.avatar;

    return (
      <View style={styles.header}>
        <Image source={avatarSource} style={styles.avatarLarge} />
        <Text style={styles.nameText}>{user.name && user.name.trim()}</Text>
        <Text style={styles.infoText}>{user.location && user.location.trim()}</Text>
        <Text style={styles.ethAddress}>{user && user.ethAddress}</Text>
      </View>
    );
  }
}

export default ProfileScreen;

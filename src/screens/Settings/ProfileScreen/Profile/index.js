// @flow

import React from 'react';
import {
  Image,
  View,
  Text,
  Alert,
} from 'react-native';

import styles from './styles';
import AssetsImage from '../../../../global/AssetsImages';
import NavigatorComponent from '../../../../components/common/NavigatorComponent';
import Colors from '../../../../global/colors';
import type { Navigator } from '../../../../types/ReactNativeNavigation';
import type { Account } from '../../../../types/Account';
import i18n from '../../../../global/i18n';
import ScreenTitle from '../../../../components/common/ScreenTitle';
// import Button from '../../../../components/common/Button';
import { androidNavigationButtons } from '../../../../global/Screens';
import { imageSource } from '../../../../utils/profile';

const EDIT_BUTTON = 'EDIT_BUTTON';

export type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Current account object
   */
  account: Account,
  /**
   * @desc Current account public key
   */
  publicKey: string,
  /**
   * @desc Flag that determines if testing mode is activated
   */
  testingModeActive: boolean,
  /**
   * @desc Function to start account edit
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
      ...androidNavigationButtons,
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
        <ScreenTitle title={i18n.t('screens.profile.title')} />
        {this._buildHeader()}
        {this._buildPublicKey()}
      </View>
    );
  }

  _buildHeader() {
    const { account } = this.props;

    const avatarSource = imageSource(account.avatar) || AssetsImage.avatarIcon;

    return (
      <View style={styles.header}>
        <Image source={avatarSource} style={styles.avatarLarge} />
        <Text style={styles.nameText}>{account.name && account.name.trim()}</Text>
        <Text style={styles.infoText}>{account.location && account.location.trim()}</Text>
      </View>
    );
  }

  _buildPublicKey() {
    const { publicKey } = this.props;
    return (
      <View style={styles.publicKey}>
        <Text style={styles.publicKeyText}>{publicKey && publicKey.trim()}</Text>
      </View>
    );
  }
}

export default ProfileScreen;

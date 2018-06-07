// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import Images from '../../global/AssetsImages';
import i18n from '../../global/i18n';
import { screen } from '../../global/Screens';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import Button from '../../components/common/Button';
import type { Navigator } from '../../types/ReactNativeNavigation';
import styles from './styles';
import { startRestoreAccountUsingMnemonic, startAccountCreation } from '../../actions/accounts';
import { type State as AccountsState } from '../../reducers/accounts';
import type { Mnemonic } from '../../types/Mnemonic';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

type Actions = {
  /**
   * @desc Action to start account process.
   */
  startAccountCreation: () => void,
  /**
   * @desc Action to restore account with mnemonic.
   * @param {Mnemonic} mnemonic Mnemonic to be used.
   */
  startRestoreAccountUsingMnemonic: (mnemonic: Mnemonic) => void
}

class Accounts extends NavigatorComponent<Props & Actions & AccountsState> {
  static onCreateAccount = (navigator: Navigator, startCreate: () => void) => {
    startCreate();
    Accounts.showSecuritySettingsScreen(navigator);
  };

  static showSecuritySettingsScreen(navigator: Navigator) {
    navigator.push({
      ...screen('SECURITY_SETTINGS_SCREEN'),
      passProps: {
        isCreating: true,
      },
    });
  }

  static onRestoreAccount = (navigator: Navigator, startRestore: (mnemonic: Mnemonic) => void) => {
    navigator.push({
      ...screen('RESTORE_KEY_SCREEN'),
      passProps: {
        onCancel: () => navigator.pop(),
        onDoneEntering: (mnemonic: Mnemonic) => {
          startRestore(mnemonic);
          Accounts.showSecuritySettingsScreen(navigator);
        },
      },
    });
  };

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyAccountContainer}>
          <Image
            source={Images.avatarIcon}
            resizeMode='cover'
          />
          <Text style={[styles.title1, styles.accountTitle]}>{i18n.t('screens.accounts.title')}
          </Text>
          <Text style={[styles.subhead, styles.accountIntroText]}>{i18n.t('screens.accounts.introduction')}</Text>


          <Button
            id='restoreButton'
            style={styles.restoreButton}
            styleTitle={styles.restoreButtonText}
            title={i18n.t('screens.accounts.restoreAccount')}
            onPress={() => Accounts.onRestoreAccount(this.props.navigator, this.props.startRestoreAccountUsingMnemonic)}
          />

        </View>
        <Button
          id='createButton'
          styleTitle={styles.newAccountText}
          style={styles.createButton}
          title={i18n.t('screens.accounts.newAccount')}
          onPress={() => Accounts.onCreateAccount(this.props.navigator, this.props.startAccountCreation)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.accounts,
});

const mapDispatchToProps = dispatch => ({
  startAccountCreation() {
    dispatch(startAccountCreation());
  },
  startRestoreAccountUsingMnemonic(mnemonic) {
    dispatch(startRestoreAccountUsingMnemonic(mnemonic));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);

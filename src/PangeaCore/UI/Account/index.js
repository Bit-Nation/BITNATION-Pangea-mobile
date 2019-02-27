// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Linking, Platform } from 'react-native';
import Images from 'pangea-common-reactnative/assets/AssetsImages';
import i18n from 'pangea-common/i18n';
import { screen } from 'pangea-common-reactnative/Screens';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import NavigatorComponent from 'pangea-common-reactnative/UI/NavigatorComponent';
import Button from 'pangea-common-reactnative/UI/Button';
import type { Navigator } from '../../types/ReactNativeNavigation';
import styles from './styles';
import { startRestoreAccountUsingMnemonic, startAccountCreation } from '../accounts-actions';
import { type State as AccountsState } from '../accounts-reducers';
import type { Mnemonic } from 'pangea-common/types/Mnemonic-types';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import { alert } from 'pangea-common/alerts';

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

  static showResetPasscodeSuccess = async (navigator: Navigator) => {
    alert('successResetPassword', [
      {
        name: 'confirm',
        onPress: async () => {
          if (Platform.OS === 'ios') {
            await navigator.dismissModal();
          } else {
            navigator.dismissModal();
          }
          navigator.pop();
        },
      }]);
  }

  static showCreatePasscodeContainer(navigator: Navigator, id: string) {
    navigator.showModal({
      ...screen('CREATE_PASSCODE_SCREEN'),
      passProps: {
        accountId: id,
        onSuccess: () => Accounts.showResetPasscodeSuccess(navigator),
        onCancel: () => navigator.dismissModal(),
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

  static onForgetPasswordAccount = async (navigator: Navigator, currentAccountId: string) => {
    if (Platform.OS === 'ios') {
      await navigator.dismissModal();
    } else {
      navigator.dismissModal();
    }
    navigator.push({
      ...screen('RESTORE_KEY_SCREEN'),
      passProps: {
        isOnResetPassProcess: true,
        accountId: currentAccountId,
        onDoneEntering: () => {
          Accounts.showCreatePasscodeContainer(navigator, currentAccountId);
        },
      },
    });
  };

  onOpenRUrl = () => {
    Linking.canOpenURL('https://steemit.com/bitnation/@infinitechaos/pangea-v0-4-5-june-8-release-note-important').then((supported) => {
      if (supported) {
        Linking.openURL('https://steemit.com/bitnation/@infinitechaos/pangea-v0-4-5-june-8-release-note-important');
      } else {
        console.log('Error opening URL');
      }
    });
  };
  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage maskColor='rgba(239, 218, 62, 0.6)' source={Images.backgroundLogin} />
        <FakeNavigationBar />
        <View style={styles.bodyAccountContainer}>
          <Image
            source={Images.avatarIcon}
            resizeMode='cover'
          />
          <Text style={[styles.title1, styles.accountTitle]}>{i18n.t('screens.accounts.title')}
          </Text>
          <Text style={[styles.subhead, styles.accountIntroText]}>{i18n.t('screens.accounts.introduction')}</Text>
          <PanelView
            title={i18n.t('screens.accounts.warningTitle')}
            style={styles.gridPanelViewWarning}
            childrenContainerStyle={styles.warningPanelChildrenContainerStyle}
            titleStyle={styles.alertPanelViewTitle}
            buttonTitle={i18n.t('screens.accounts.checkRelease')}
            onButtonClick={this.onOpenRUrl}
          >
            <Text style={styles.confirmKeyBody}>{i18n.t('screens.accounts.warningText')}</Text>
          </PanelView>
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

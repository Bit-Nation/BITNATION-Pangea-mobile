// @flow

import React from 'react';
import { Slider, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';
import styles from './styles';
import NavigatorComponent from '../../NavigatorComponent';
import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import i18n from 'pangea-common/i18n';
import { screen, androidNavigationButtons } from 'pangea-common-reactnative/Screens';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
// import Button from '../../../components/common/Button';
import type { State as SettingsState } from '@pangea/settings/settings-reducers';
import SettingsListItem from 'pangea-common-reactnative/UI/SettingsListItem';
import {
  changePasscodeLength,
  changeUseNumericPasscode,
  loadSettings,
  saveSettings,
} from '@pangea/settings/settings-actions';
import Colors from 'pangea-common-reactnative/styles/colors';
import {
  MAXIMAL_PIN_CODE_LENGTH,
  MINIMAL_PIN_CODE_LENGTH,
} from 'pangea-common/Constants';
import type { State as AccountsState } from '@pangea/accounts/accounts-reducers';
import { isCreatingAccount } from '@pangea/accounts/accounts-reducers';
import { alert } from 'pangea-common/alerts';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Accounts redux state.
   */
  accounts: AccountsState,
};

type Actions = {
  /**
   * @desc Action to change desired using of numeric passcode.
   */
  changeUseNumericPasscode: boolean => void,
  /**
   * @desc Action to change desired length of numeric passcode.
   */
  changePasscodeLength: number => void,
  /**
   * @desc Action to save current settings.
   */
  saveSettings: (
    accountId: string,
    callback: (success: boolean) => void,
  ) => void,
  /**
   * @desc Action to load settings for account from database.
   */
  loadSettings: (
    accountId: string,
    callback: (success: boolean) => void,
  ) => void,
};

type State = {
  pinCodeLengthSliderTemporaryValue: ?number,
};

class SecuritySettingsScreen extends NavigatorComponent<
  Props & Actions & SettingsState,
  State,
> {
  static navigatorButtons = { ...androidNavigationButtons };

  constructor(props) {
    super(props);

    this.state = {
      pinCodeLengthSliderTemporaryValue: null,
    };
  }

  onNavBarButtonPress(id: string): void {
    if (id === 'cancel') {
      this.onPreviousPressed();
    }
  }

  onPreviousPressed = () => {
    this.props.navigator.pop();
  };

  onPasscodeCreated = () => {
    // @todo It is a hack because React Native Navigation API is not consistent between platforms.
    if (Platform.OS === 'ios') {
      this.props.navigator.dismissModal().then(() => {
        this.props.navigator.push(screen('ACCOUNT_CREATE_DEVELOPER_SETTINGS'));
      });
    } else {
      this.props.navigator.dismissModal();
      this.props.navigator.push(screen('ACCOUNT_CREATE_DEVELOPER_SETTINGS'));
    }
  };

  onPasscodeChanged = () => {
    const { currentAccountId } = this.props.accounts;
    if (currentAccountId === null) {
      console.log('FAIL! Current account id is null when passcode is changed on security settings is pressed, that should never happen');
      return;
    }
    this.props.saveSettings(currentAccountId, () => {
      this.props.navigator.dismissAllModals();
    });
  };

  /**
   * @desc This property stores changes that is going to be applied to settings, but waiting for current passcode to be entered.
   * @type {null}
   */
  applySettingsChanges: (() => void) | null = null;

  /**
   * @desc It is used on create account flow.
   * @return {void}
   */
  onNextPressed = () => {
    const { creatingAccount } = this.props.accounts;
    if (creatingAccount === null) {
      console.log('FAIL! Creating account is null when next button on security settings is pressed, that should never happen');
      return;
    }

    this.props.navigator.showModal({
      ...screen('CREATE_PASSCODE_SCREEN'),
      passProps: {
        accountId: creatingAccount.id,
        onSuccess: this.onPasscodeCreated,
        onCancel: () => this.props.navigator.dismissModal(),
      },
    });
  };

  askEnterCurrentPassword = () => {
    const { currentAccountId } = this.props.accounts;
    if (currentAccountId === null) {
      console.log('FAIL! Current account id is null when change passcode button on security settings is pressed, that should never happen');
      return;
    }

    this.props.navigator.showModal({
      ...screen('ENTER_PASSCODE_SCREEN'),
      passProps: {
        accountId: currentAccountId,
        onCancel: () => {
          this.setState({ pinCodeLengthSliderTemporaryValue: null });
          this.props.navigator.dismissModal();
        },
        onSuccess: () => {
          if (this.applySettingsChanges !== null) {
            this.applySettingsChanges();
          }
          this.onChangePasscodeAuthorized();
        },
      },
    });
  };

  onChangePasscodeAuthorized = () => {
    const { currentAccountId } = this.props.accounts;
    if (currentAccountId === null) {
      return;
    }

    this.props.navigator.showModal({
      ...screen('CREATE_PASSCODE_SCREEN'),
      passProps: {
        accountId: currentAccountId,
        onSuccess: this.onPasscodeChanged,
        onCancel: () => {
          this.props.loadSettings(currentAccountId, () => {
            this.applySettingsChanges = null;
            this.props.navigator.dismissAllModals();
          });
        },
      },
    });
  };

  changePasscodeType = () => {
    const isCreating = isCreatingAccount(this.props.accounts);
    if (isCreating === true) {
      if (this.applySettingsChanges) {
        this.applySettingsChanges();
      }
      return;
    }
    alert('changingPasscodeType', [
      {
        name: 'cancel',
        style: 'cancel',
        onPress: () => {
          this.applySettingsChanges = null;
          this.setState({ pinCodeLengthSliderTemporaryValue: null });
        },
      },
      {
        name: 'confirm',
        onPress: this.askEnterCurrentPassword,
      },
    ]);
  };

  render() {
    const { passcodeType } = this.props;
    const isCreating = isCreatingAccount(this.props.accounts);

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.securitySettings.title')} />
          <SettingsListItem
            id='useNumericPasscode'
            text={i18n.t('screens.securitySettings.useNumericPasscode')}
            additionalViewKind={{
              type: 'switch',
              value: passcodeType.type === 'pinCode',
              onValueChange: (value) => {
                this.applySettingsChanges = () => {
                  this.props.changeUseNumericPasscode(value);
                };
                this.changePasscodeType();
              },
            }}
            style={styles.noflex}
          />

          {passcodeType.type === 'pinCode' && (
            <View style={styles.passCodeLengthItemContainer}>
              <View style={styles.passCodeLengthItem}>
                <Text style={styles.listItemText} numberOfLines={1}>
                  {i18n.t('screens.securitySettings.passcodeLength')}
                </Text>
                <Text style={styles.passCodeLengthNumberText} numberOfLines={1}>
                  {this.state.pinCodeLengthSliderTemporaryValue ||
                    passcodeType.length}
                </Text>
              </View>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={MINIMAL_PIN_CODE_LENGTH}
                  maximumValue={MAXIMAL_PIN_CODE_LENGTH}
                  step={1}
                  value={
                    this.state.pinCodeLengthSliderTemporaryValue ||
                    passcodeType.length
                  }
                  onSlidingComplete={(value) => {
                    if (passcodeType.length === value) {
                      return;
                    }
                    this.applySettingsChanges = () => {
                      this.props.changePasscodeLength(value);
                      this.setState({
                        pinCodeLengthSliderTemporaryValue: null,
                      });
                    };
                    this.changePasscodeType();
                  }}
                  onValueChange={value =>
                    this.setState({ pinCodeLengthSliderTemporaryValue: value })
                  }
                  minimumTrackTintColor={Colors.BitnationHighlightColor}
                />
              </View>
            </View>
          )}

          {isCreating === false && (
            <SettingsListItem
              id='changePasscode'
              text={i18n.t('screens.securitySettings.changePasscode')}
              style={styles.noflex}
              onPress={this.askEnterCurrentPassword}
            />
          )}
        </View>
        {isCreating && (
          <View style={styles.bodyContainer}>
            <View style={styles.buttonContainerMultiple}>
              <Button
                transparent
                style={styles.buttonPrevNext}
                onPress={this.onPreviousPressed}
              >
                <Text style={styles.prevText}>{i18n.t('screens.accounts.create.prev')}</Text>
              </Button>
              <Button
                transparent
                style={styles.buttonPrevNext}
                onPress={this.onNextPressed}
              >
                <Text style={styles.nextText}>{i18n.t('screens.accounts.create.next')}</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  accounts: state.accounts,
});

const mapDispatchToProps = dispatch => ({
  changeUseNumericPasscode(useNumericPasscode: boolean) {
    dispatch(changeUseNumericPasscode(useNumericPasscode));
  },
  changePasscodeLength(length: number) {
    dispatch(changePasscodeLength(length));
  },
  loadSettings(accountId, callback) {
    dispatch(loadSettings(accountId, callback));
  },
  saveSettings(accountId, callback) {
    dispatch(saveSettings(accountId, callback));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SecuritySettingsScreen);

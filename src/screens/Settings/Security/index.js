// @flow

import React from 'react';
import { Slider, Text, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import i18n from '../../../global/i18n';
import { screen, androidNavigationButtons } from '../../../global/Screens';
import ScreenTitle from '../../../components/common/ScreenTitle';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Button from '../../../components/common/Button';
import type { State as SettingsState } from '../../../reducers/settings';
import SettingsListItem from '../../../components/common/SettingsListItem';
import { changePasscodeLength, changeUseNumericPasscode } from '../../../actions/settings';
import Colors from '../../../global/colors';
import { MAXIMAL_PIN_CODE_LENGTH, MINIMAL_PIN_CODE_LENGTH } from '../../../global/Constants';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc A flag that indicates if the user is being created
   */
  isCreating?: Boolean
};

type Actions = {
  /**
   * @desc Action to change desired using of numeric passcode.
   */
  changeUseNumericPasscode: (boolean) => void,
  /**
   * @desc Action to change desired length of numeric passcode.
   */
  changePasscodeLength: (number) => void,
};

class SecuritySettingsScreen extends NavigatorComponent<Props & Actions & SettingsState> {
  static navigatorButtons = { ...androidNavigationButtons };
  static defaultProps;

  onNavBarButtonPress(id: string): void {
    if (id === 'cancel') {
      this.onPreviousPressed();
    }
  }

  onPreviousPressed = () => {
    this.props.navigator.pop();
  };

  /**
   * @desc It's used on create account flow.
   * @return {void}
   */
  onNextPressed = () => {
    this.props.navigator.push({
      ...screen('CREATE_PASSCODE_SCREEN'),
      passProps: {
        onSuccess: () => this.props.navigator.push(screen('ACCOUNT_CREATE_DEVELOPER_SETTINGS')),
        onCancel: () => this.props.navigator.pop(),
      },
    });
  };

  render() {
    const { passcodeInfo, isCreating } = this.props;

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.securitySettings.title')} />
        <View style={styles.bodyContainer}>
          <SettingsListItem
            id='useNumericPasscode'
            text={i18n.t('screens.securitySettings.useNumericPasscode')}
            additionalViewKind={{
              type: 'switch',
              value: passcodeInfo.type === 'pinCode',
              onValueChange: this.props.changeUseNumericPasscode,
            }}
            style={styles.noflex}
          />

          {
            passcodeInfo.type === 'pinCode' &&
            <View style={styles.passCodeLengthItemContainer}>
              <View style={styles.passCodeLengthItem}>
                <Text style={styles.listItemText} numberOfLines={1}>
                  {i18n.t('screens.securitySettings.passcodeLength')}
                </Text>
                <Text style={styles.passCodeLengthNumberText} numberOfLines={1}>
                  {passcodeInfo.length}
                </Text>
              </View>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={MINIMAL_PIN_CODE_LENGTH}
                  maximumValue={MAXIMAL_PIN_CODE_LENGTH}
                  step={1}
                  value={passcodeInfo.length}
                  onValueChange={this.props.changePasscodeLength}
                  minimumTrackTintColor={Colors.BitnationHighlightColor}
                />
              </View>
            </View>
          }

          {
            isCreating === false &&
            <SettingsListItem
              id='changePasscode'
              text={i18n.t('screens.securitySettings.changePasscode')}
              style={styles.noflex}
            />
          }
        </View>
        {isCreating &&
        <View style={styles.buttonContainerMultiple}>
          <Button
            style={styles.panelButton}
            title={i18n.t('screens.accounts.create.prev')}
            onPress={this.onPreviousPressed}
          />
          <Button
            style={styles.panelButton}
            title={i18n.t('screens.accounts.create.next')}
            onPress={this.onNextPressed}
          />
        </View>
        }
      </View>
    );
  }
}

SecuritySettingsScreen.defaultProps = {
  isCreating: false,
};

const mapStateToProps = state => ({
  ...state.settings,
});

const mapDispatchToProps = dispatch => ({
  changeUseNumericPasscode(useNumericPasscode: boolean) {
    dispatch(changeUseNumericPasscode(useNumericPasscode));
  },
  changePasscodeLength(length: number) {
    dispatch(changePasscodeLength(length));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SecuritySettingsScreen);

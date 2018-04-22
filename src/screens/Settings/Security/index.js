// @flow

import React from 'react';
import { Slider, Text, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import i18n from '../../../global/i18n';
import { androidNavigationButtons } from '../../../global/Screens';
import ScreenTitle from '../../../components/common/ScreenTitle';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import { State as SettingsState } from '../../../reducers/settings';
import SettingsListItem from '../../../components/common/SettingsListItem';
import { changePasscodeLength, changeUseNumericPasscode } from '../../../actions/settings';
import Colors from '../../../global/colors';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
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

class ProfileScreen extends NavigatorComponent<Props & Actions & SettingsState> {
  static navigatorButtons = { ...androidNavigationButtons };

  onNavBarButtonPress(id: string): void {
    if (id === 'cancel') {
      this.props.navigator.pop();
    }
  }

  render() {
    const { passcodeInfo } = this.props;

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
                  minimumValue={4}
                  maximumValue={8}
                  step={1}
                  value={passcodeInfo.length}
                  onValueChange={this.props.changePasscodeLength}
                  minimumTrackTintColor={Colors.BitnationHighlightColor}
                />
              </View>
            </View>
          }

          <SettingsListItem
            id='changePasscode'
            text={i18n.t('screens.securitySettings.changePasscode')}
            style={styles.noflex}
          />
        </View>
      </View>
    );
  }
}

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


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

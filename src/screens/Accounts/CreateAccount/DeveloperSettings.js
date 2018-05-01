// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import i18n from '../../../global/i18n';
import { screen } from '../../../global/Screens';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import ScreenTitle from '../../../components/common/ScreenTitle';
import Button from '../../../components/common/Button';
import SwitchLabeled from '../../../components/common/SwitchLabeled';
import styles from '../styles';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import { type State as AccountsState } from '../../../reducers/accounts';
import { changeCreatingAccountField } from '../../../actions/accounts';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

type Actions = {
  /**
   * @desc Action to change field of currently created account.
   */
  changeCreatingAccount: (field: string, value: any) => void,
}

class DeveloperSettings extends Component<Props & Actions & AccountsState> {
  previousStep = () => {
    this.props.navigator.pop();
  };

  nextStep = () => {
    this.props.navigator.push(screen('ACCOUNT_CREATE_IDENTITY'));
  };

  render() {
    const { creatingAccount } = this.props;
    if (creatingAccount == null) {
      this.previousStep();
      return (
        <View />
      );
    }

    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.create.title')} />
          <View style={styles.bodyContainer}>
            <Text style={styles.headline}>{i18n.t('screens.accounts.create.developerTitle')}</Text>
            <View style={styles.formRow}>
              <View style={styles.fieldsContainer}>
                <SwitchLabeled
                  label={i18n.t('screens.accounts.create.testingAccount')}
                  value={creatingAccount.networkType !== 'main'}
                  align='right'
                  onValueChange={value => this.props.changeCreatingAccount('networkType', value ? 'dev' : 'main')}
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <View style={styles.fieldsContainer}>
                <Text style={styles.body}>
                  {creatingAccount.networkType === 'main' ?
                    i18n.t('screens.accounts.create.useMainNetwork') :
                    i18n.t('screens.accounts.create.useRinkebyNetwork')}
                </Text>
              </View>
            </View>
            {/* Removed for 0.4.1
            <View style={styles.formRow}>
              <View style={styles.fieldsContainer}>
                <SwitchLabeled
                  label={i18n.t('screens.accounts.create.detailLogging')}
                  value={this.state.detailedLogging}
                  align='right'
                  onValueChange={value => this.setFieldValue('detailedLogging', value)}
                  disabled={!this.state.testingAccount}
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <View style={styles.fieldsContainer}>
                <SwitchLabeled
                  label={i18n.t('screens.accounts.create.debuggingTools')}
                  value={this.state.debuggingTools}
                  align='right'
                  onValueChange={value => this.setFieldValue('debuggingTools', value)}
                  disabled={!this.state.testingAccount}
                />
              </View>
            </View>
          */}
          </View>
          <View style={styles.buttonContainerMultiple}>
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.create.prev')}
              onPress={this.previousStep}
            />
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.create.next')}
              onPress={this.nextStep}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.accounts,
});

const mapDispatchToProps = dispatch => ({
  changeCreatingAccount(field, value) {
    dispatch(changeCreatingAccountField(field, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperSettings);

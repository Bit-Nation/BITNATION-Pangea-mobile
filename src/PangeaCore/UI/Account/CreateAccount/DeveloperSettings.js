// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import i18n from 'pangea-common/i18n';
import { androidNavigationButtons, screen } from 'pangea-common-reactnative/Screens';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';
import SwitchLabeled from 'pangea-common-reactnative/UI/SwitchLabeled';
import styles from '../styles';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import { type State as AccountsState } from '../../accounts-reducers';
import { changeCreatingAccountField } from '../../accounts-actions';

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
};

class DeveloperSettings extends Component<Props & Actions & AccountsState> {
  static navigatorButtons = { ...androidNavigationButtons };

  previousStep = () => {
    this.props.navigator.pop();
  };

  nextStep = () => {
    this.props.navigator.push(screen('PROFILE_SCREEN'));
  };

  render() {
    const { creatingAccount } = this.props;
    if (creatingAccount == null) {
      this.previousStep();
      return <View />;
    }

    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage
          maskColor={
            creatingAccount.networkType === 'main'
              ? undefined
              : 'rgba(239, 218, 39, 0.05)'
          }
        />
        {creatingAccount.networkType !== 'main' ? (
          <Text style={styles.textNetworkTypeStyle}>
            {i18n.t('screens.accounts.create.rinkebyNetwork')}
          </Text>
        ) : null}
        <FakeNavigationBar />
        <View style={styles.bodyAccountContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.create.title')} />
          <View style={styles.bodyContainer}>
            <Text style={styles.headline}>
              {i18n.t('screens.accounts.create.developerTitle')}
            </Text>
            <View style={styles.formRow}>
              <View style={styles.fieldsContainer}>
                <SwitchLabeled
                  label={i18n.t('screens.accounts.create.testingAccount')}
                  value={creatingAccount.networkType !== 'main'}
                  align='right'
                  onValueChange={value =>
                    this.props.changeCreatingAccount(
                      'networkType',
                      value ? 'dev' : 'main',
                    )
                  }
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <View style={styles.fieldsContainer}>
                <Text style={styles.body}>
                  {creatingAccount.networkType === 'main'
                    ? i18n.t('screens.accounts.create.useMainNetwork')
                    : i18n.t('screens.accounts.create.useRinkebyNetwork')}
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
          <View style={styles.bodyContainer}>
            <View style={styles.buttonContainerMultiple}>
              <Button
                transparent
                style={styles.buttonPrevNext}
                onPress={this.previousStep}
              >
                <Text style={styles.prevText}>
                  {i18n.t('screens.accounts.create.prev')}
                </Text>
              </Button>
              <Button
                transparent
                style={styles.buttonPrevNext}
                onPress={this.nextStep}
              >
                <Text style={styles.nextText}>
                  {i18n.t('screens.accounts.create.next')}
                </Text>
              </Button>
            </View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeveloperSettings);

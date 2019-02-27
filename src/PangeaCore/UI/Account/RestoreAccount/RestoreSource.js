// @flow
// It is not used in 0.4.1 since we can only restore account using a private key.
/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import i18n from 'pangea-common/i18n';
import { screen } from 'pangea-common-reactnative/Screens';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';
import Button from 'pangea-common-reactnative/UI/Button';
import styles from '../styles';

import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

class RestoreSource extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.nextStep = this.nextStep.bind(this);
    this.restoreFromClipboard = this.restoreFromClipboard.bind(this);
    this.restoreFromFile = this.restoreFromFile.bind(this);
    this.restoreFromCloud = this.restoreFromCloud.bind(this);
  }

  nextStep: Function;
  restoreFromClipboard: Function;
  restoreFromFile: Function;
  restoreFromCloud: Function;

  restoreFromClipboard() {

  }

  restoreFromFile() {

  }

  restoreFromCloud() {

  }

  nextStep() {
    this.props.navigator.push(screen('ACCOUNT_RESTORE_EMPTY_WALLET'));
  }

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyAccountContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.restore.title')} />
          <View style={styles.bodyContainer}>
            <Text style={styles.body}>
              {i18n.t('screens.accounts.restore.source')}
            </Text>
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.restore.clipboard')}
              onPress={this.restoreFromClipboard}
            />
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.restore.file')}
              onPress={this.restoreFromFile}
            />
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.restore.cloud')}
              onPress={this.restoreFromCloud}
            />
          </View>
          <View style={styles.bottomSpacer}>
            <Button
              style={[styles.panelButton, styles.baseButton]}
              title={i18n.t('screens.accounts.create.next')}
              onPress={this.nextStep}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RestoreSource);

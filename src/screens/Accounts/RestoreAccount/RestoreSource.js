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
import styles from '../styles';

import type { Navigator } from '../../../types/ReactNativeNavigation';

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
        <View style={styles.screenContainer}>
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

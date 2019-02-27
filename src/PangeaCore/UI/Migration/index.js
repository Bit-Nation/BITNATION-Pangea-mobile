// @flow

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import i18n from 'pangea-common/i18n';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import styles from './styles';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';
import { startMigration } from '@pangea/migration/migration-actions';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import NavigatorComponent from '../NavigatorComponent';
import Colors from 'pangea-common-reactnative/styles/colors';

type Actions = {
  /**
   * @desc Function to initiate migration
   */
  startMigration: () => void
};

class MigrationScreen extends NavigatorComponent<Actions> {
  componentWillMount() {
    this.props.startMigration();
  }

  render() {
    return (
      <View style={styles.migrationContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.migration.title')} />
        <View style={styles.bodyContainer}>
          <ActivityIndicator size='small' color={Colors.textPrimary} />
          <Text style={[styles.subhead, styles.migrationText]}>{i18n.t('screens.migration.migrateData')}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.migration,
});

const mapDispatchToProps = dispatch => ({
  startMigration: () => dispatch(startMigration()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MigrationScreen);

// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import i18n from '../../global/i18n';
import BackgroundImage from '../../components/common/BackgroundImage';
import styles from './styles';
import ScreenTitle from '../../components/common/ScreenTitle';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import { startMigration } from '../../actions/migration';

type Props = {
  /**
   * @desc Function to initiate migration
   */
  startMigration: () => void,
}

type Actions = {
  // @todo Action to be added later.
};

type State = {
  // @todo State to be added later.
}

class MigrationScreen extends NavigatorComponent<Props & Actions, State> {
  componentDidMount() {
    this.props.startMigration();
  }

  render() {
    return (
      <View style={styles.migrationContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.migration.title')} />
        <View style={styles.bodyContainer}>
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
  // @todo Dispatch Actions to be added later.
  startMigration() {
    dispatch(startMigration());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MigrationScreen);

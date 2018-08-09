// @flow

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import i18n from '../../global/i18n';
import BackgroundImage from '../../components/common/BackgroundImage';
import styles from './styles';
import ScreenTitle from '../../components/common/ScreenTitle';
import { startMigration } from '../../actions/migration';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import Colors from '../../global/colors';

type Props = {
  /**
  * @desc Function to initiate migration
  */
  startMigration: () => void
}

type Actions = {
  // @todo Action to be added later.
};

type State = {
  // @todo State to be added later.
}

class MigrationScreen extends NavigatorComponent<Props & Actions, State> {
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

// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import i18n from '../../global/i18n';
import { startMigration } from '../../actions/migration';
import BackgroundImage from '../../components/common/BackgroundImage';
import styles from './styles';
import ScreenTitle from '../../components/common/ScreenTitle';
import NavigatorComponent from '../../components/common/NavigatorComponent';

type Props = {
}

type Actions = {
};

type State = {
}

class MigrationScreen extends NavigatorComponent<Props & Actions, State> {
  componentDidMount() {
    // this.props.startMigration();
  }
  render() {
    return (
      <View style={styles.migrationContainer}>
        <BackgroundImage />
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
  startMigration() {
    dispatch(startMigration());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MigrationScreen);

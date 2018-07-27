// @flow

import React from 'react';
import { View, Text } from 'react-native';
import i18n from '../../global/i18n';

import BackgroundImage from '../../components/common/BackgroundImage';
import styles from './styles';
import NavigatorComponent from '../../components/common/NavigatorComponent';

type Props = {
    navigator: Navigator,
  }

type Actions = {
};

type State = {
}

class MigrationScreen extends NavigatorComponent<Props & Actions, State> {
  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <Text style={[styles.title1, styles.migrationTitle]}>{i18n.t('screens.migration.title')}</Text>
        <Text style={[styles.subhead, styles.migrationText]}>{i18n.t('screens.migration.migratedata')}</Text>
      </View>
    );
  }
}

export default MigrationScreen;

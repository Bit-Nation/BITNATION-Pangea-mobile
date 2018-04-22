// @flow

import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';
import ScreenTitle from '../../../components/common/ScreenTitle';
import SettingsListItem from '../../../components/common/SettingsListItem';
import type { SettingsItem } from '../../../types/Settings';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import { screen } from '../../../global/Screens';
import type { Navigator } from '../../../types/ReactNativeNavigation';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to select specific ite,.
   * @param {any} id Id of selected item.
   */
  onSelectItem: (id: SettingsItem) => void,
}

class SettingsListScreen extends NavigatorComponent<Props> {
  onSelectItem = (item: SettingsItem) => {
    switch (item) {
      case 'identity':
        this.props.navigator.push(screen('PROFILE_SCREEN'));
        break;
      case 'security':
        this.props.navigator.push(screen('SECURITY_SETTINGS_SCREEN'));
        break;
      default:
        break;
    }
  };

  render() {
    const items: Array<SettingsItem> = [
      'identity',
      'security',
    ];

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.settings.title')} />
        <View style={styles.bodyContainer}>
          <FlatList
            renderItem={item => (<SettingsListItem
              id={item.item}
              onPress={this.onSelectItem}
              text={i18n.t(`screens.settings.${item.item}`)}
            />)}
            keyExtractor={item => item}
            data={items}
            style={styles.sectionList}
          />
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  accounts: state.accounts,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsListScreen);

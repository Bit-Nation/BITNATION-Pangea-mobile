// @flow

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import i18next from 'i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from 'pangea-common/i18n';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import styles from './styles';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import DropDown from '../../components/DropDown';
import SwitchComponent from '../../components/SwitchComponent';
import type { SettingsItem } from '@pangea/settings/settings-types';
import NavigatorComponent from '../../NavigatorComponent';
import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import { logout } from '@pangea/accounts/accounts-actions';
import {
  type State as AccountsState,
  getCurrentAccount,
} from '@pangea/accounts/accounts-reducers';
import colors from 'pangea-common-reactnative/styles/colors';

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
  /**
   * @desc Function to logout from current account.
   */
  logout: () => void,
  /**
   * @desc Accounts Redux state.
   */
  accounts: AccountsState,
};

type State = {
  /**
   * @desc State of switch notification
   */
  onNotification: boolean,
};

class SettingsListScreen extends NavigatorComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      onNotification: true,
    };
  }

  render() {
    const currentAccount = getCurrentAccount(this.props.accounts);

    if (currentAccount == null) {
      return <View />;
    }

    const data = [
      <View style={styles.itemStyle}>
        <MaterialCommunityIcons name='flag-variant' style={styles.itemIcon} />
        <Text style={styles.itemSelectText}>English</Text>
      </View>,
      <View style={styles.itemStyle}>
        <MaterialCommunityIcons
          name='flag-variant-outline'
          style={styles.itemIcon}
        />
        <Text style={styles.itemSelectText}>Hindi</Text>
      </View>,
    ];

    const dataNetwork = [
      <View style={styles.itemStyle}>
        <MaterialCommunityIcons name='ethereum' style={styles.itemIcon} />
        <Text style={styles.itemSelectText}>Ethereum Main Network</Text>
      </View>,
      <View style={styles.itemStyle}>
        <MaterialCommunityIcons name='ethereum' style={styles.itemIcon} />
        <Text style={styles.itemSelectText}>Rinkeby Testing Network</Text>
      </View>,
    ];

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.contentView}>
          <View style={styles.itemViewStyle}>
            <DropDown
              label={i18n.t('screens.settings.chooseLanguage')}
              data={data}
            />
          </View>
          <View style={styles.itemViewStyle}>
            <DropDown
              label={i18n.t('screens.settings.chooseNetwork')}
              data={dataNetwork}
            />
          </View>
          <View style={styles.itemViewStyle}>
            <Text style={styles.itemSelectText}>
              {i18n.t('screens.settings.notification')}
            </Text>
            <SwitchComponent
              containerStyle={styles.rightViewSwitch}
              buttons={[
                {
                  label: 'No',
                  onPress: () => {
                    this.setState({ onNotification: false });
                  },
                  selected: this.state.onNotification === false,
                },
                {
                  label: 'YES',
                  onPress: () => {
                    this.setState({ onNotification: true });
                  },
                  selected: this.state.onNotification === true,
                },
              ]}
            />
          </View>
          <View style={styles.itemViewStyle}>
            <Text style={styles.itemSelectText}>
              {i18n.t('screens.settings.bitnationGold')}
            </Text>
            <View style={styles.rightView}>
              <View style={styles.itemGoldView} />
              <View
                style={[
                  styles.itemGoldView,
                  { backgroundColor: colors.chatColor },
                ]}
              />
              <View
                style={[
                  styles.itemGoldView,
                  { backgroundColor: colors.BitnationLinkOrangeColor },
                ]}
              />
            </View>
          </View>
          <View style={styles.buttonViewStyle}>
            <Button
              rounded
              onPress={() => this.props.navigator.pop()}
              style={styles.controlButton}
            >
              <Text style={styles.controlButtonText}>
                {i18n.t('screens.settings.goBack')}
              </Text>
            </Button>
            <Button
              rounded
              onPress={() =>
                i18next.changeLanguage('hi', (err, t) => {
                  if (err) {
                    return console.log('something went wrong loading', err);
                  }
                  t('hi'); // -> same as i18next.t
                })
              }
              style={styles.controlButton}
            >
              <Text style={styles.controlButtonText}>
                {i18n.t('screens.settings.save')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts,
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsListScreen);

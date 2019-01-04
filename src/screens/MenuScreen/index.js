import React from 'react';
import { View, Image, TouchableOpacity, Share } from 'react-native';
import { connect } from 'react-redux';
import i18next from 'i18next';
import { Button, Text } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from '../../global/i18n';
import { logout } from '../../actions/accounts';
import { getCurrentAccount } from '../../reducers/accounts';

import AssetsImages from '../../global/AssetsImages';
import styles from './styles';

// import Button from '../../components/common/Button';
import NavigatorComponent from '../../components/common/NavigatorComponent';

class MenuScreen extends NavigatorComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
    });
  };

  sharePublicKey = () => {
    Share.share({
      message: this.props.publicKey || '',
    });
  };

  onPushScreen = (screen) => {
    this.toggleDrawer();
    this.props.navigator.handleDeepLink({
      link: `push/${screen}`,
    });
  };

  render() {
    const { account, publicKey } = this.props;

    const avatarSource = AssetsImages.avatarIcon;

    return (
      <View style={styles.containerMenu}>
        <TouchableOpacity onPress={() => this.toggleDrawer()}>
          <MaterialCommunityIcons
            style={styles.closeButtonStyle}
            name='close-circle-outline'
          />
        </TouchableOpacity>
        <View style={styles.avatarView}>
          <Image source={avatarSource} style={styles.avatarLarge} />
          <Text style={styles.nameText}>
            {i18n.t('sidemenu.citizenid')}
          </Text>
          <View style={styles.publicKey}>
            <Text style={styles.publicKeyText}>
              {publicKey && publicKey.trim()}
            </Text>
          </View>
          <Button
            enabled
            style={styles.actionButton}
            onPress={this.sharePublicKey}
          >
            <Text style={styles.settingsText}>
              {' '}
              {i18n.t('sidemenu.copyaddress')}
            </Text>
          </Button>
        </View>
        <View style={styles.navigateButtonView}>
          <TouchableOpacity
            style={styles.navigateButtonStyle}
            onPress={() => this.onPushScreen('PROFILE_SCREEN')}
          >
            <View style={styles.wrapIconView}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name='account-circle'
              />
            </View>
            <View style={styles.wrapTextView}>
              <Text style={styles.navigateTextStyle}>
                {i18n.t('sidemenu.myprofile')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButtonStyle}
            onPress={() => this.onPushScreen('WALLET_SCREEN')}
          >
            <View style={styles.wrapIconView}>
              <MaterialCommunityIcons style={styles.iconStyle} name='wallet' />
            </View>
            <View style={styles.wrapTextView}>
              <Text style={styles.navigateTextStyle}>
                {i18n.t('sidemenu.wallet')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButtonStyle}
            onPress={() => this.onPushScreen('SETTINGS_SCREEN')}
          >
            <View style={styles.wrapIconView}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name='settings-outline'
              />
            </View>
            <View style={styles.wrapTextView}>
              <Text style={styles.navigateTextStyle}>
                {' '}
                {i18n.t('sidemenu.settings')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButtonStyle}
            onPress={() => this.onPushScreen('PROFILE_SCREEN')}
            // onPress={this.changeLanguage}
          >
            <View style={styles.wrapIconView}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name='contact-mail'
              />
            </View>
            <View style={styles.wrapTextView}>
              <Text style={styles.navigateTextStyle}>
                {' '}
                {i18n.t('sidemenu.contact')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigateButtonStyle}
            onPress={this.props.logout}
          >
            <View style={styles.wrapIconView}>
              <MaterialCommunityIcons
                style={styles.iconStyle}
                name='logout-variant'
              />
            </View>
            <View style={styles.wrapTextView}>
              <Text style={styles.navigateTextStyle}>
                {' '}
                {i18n.t('sidemenu.logout')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  account: getCurrentAccount(state.accounts),
  publicKey: state.accounts.currentAccountIdentityKey,
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuScreen);

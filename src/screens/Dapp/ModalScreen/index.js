// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/colors';
import GlobalStyles from '../../../global/Styles';
import i18n from '../../../global/i18n';
import { dAppProvider } from '../../../components/nativeDApps/DAppProvider';
import type { WalletType } from '../../../types/Wallet';
import View from '../../../components/dApps/View';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';

type OwnProps = {
  /**
   * @desc JSON object of layout to be displayed.
   */
  component: React.ComponentType<any>,
  /**
   * @desc Public key of DApp that controls the screen.
   */
  dAppPublicKey: string,
}

type Props = {
  /**
   * @desc List of wallets
   */
  wallets: Array<WalletType>,
}


class DAppModalScreen extends NavigatorComponent<Props & OwnProps> {
  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: i18n.t('common.cancel'),
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
  };

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.navigator.dismissModal();
    }
  }

  render() {
    return (
      <View style={GlobalStyles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={GlobalStyles.bodyContainer}>
          {React.createElement(dAppProvider(this.props)(this.props.component))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  wallets: state.wallet.wallets,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DAppModalScreen);

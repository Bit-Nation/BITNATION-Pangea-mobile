// @flow

import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import Images from '../../../global/AssetsImages';
import Colors from '../../../global/colors';
import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import { resolveWallet } from '../../../utils/wallet';
import { sendMoney } from '../../../actions/wallet';
import { androidNavigationButtons } from '../../../global/Screens';
import Loading from '../../../components/common/Loading';
import { prettyWalletBalance } from '../../../utils/formatters';
import i18n from '../../../global/i18n';
import { alert, errorAlert } from '../../../global/alerts';
import PanelView from '../../../components/common/PanelView';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import type { State as WalletState } from '../../../reducers/wallet';
import ScreenTitle from '../../../components/common/ScreenTitle';

const SEND_BUTTON = 'SEND_BUTTON';

type Actions = {
  /**
   * @desc Function to send money from selected wallet.
   * @param {string} amount Amount in ETH to send.
   * @param {string} toEthAddress Ethereum address to send money to.
   */
  onSendMoney: (amount: string, toEthAddress: string) => void,
}

type Props = Actions & WalletState;

type State = {
  /**
   * @desc Currently entered amount string in ETH.
   */
  amountString: string,
  /**
   * @desc Currently entered Ethereum address to send money to.
   */
  toEthAddress: string,
}

class SendMoney extends NavigatorComponent<Props, State> {
  static navigatorButtons = { ...androidNavigationButtons };

  onNavBarButtonPress(id) {
    if (id === SEND_BUTTON) {
      this.onSendPress();
    }
  }

  constructor(props) {
    super(props);

    this.state = { amountString: '', toEthAddress: '' };
    this.updateNavigation();
  }

  updateNavigation() {
    this.props.navigator.setButtons({
      rightButtons: [{
        title: i18n.t('common.send'),
        id: SEND_BUTTON,
        buttonColor: Colors.navigationButtonColor,
        disabled: !this.validateSendData(),
      }],
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.moneySendingError !== prevProps.moneySendingError
      && this.props.moneySendingError !== null) {
      errorAlert(this.props.moneySendingError);
    } else if (this.props.moneySendingInProgress !== prevProps.moneySendingInProgress
      && this.props.moneySendingSuccess) {
      alert('successTransaction', [
        {
          name: 'confirm',
          onPress: () => this.props.navigator.pop(),
        }]);
    }
    this.updateNavigation();
  }

  resolveWallet() {
    return resolveWallet(this.props.wallets || [], this.props.selectedWalletCurrency || '');
  }

  static parseAmount(amountString: string): number {
    return parseFloat(amountString) || 0;
  }

  validateSendData() {
    const wallet = this.resolveWallet();
    if (wallet === null) return false;
    const sendAmount = SendMoney.parseAmount(this.state.amountString);
    const currentAmount = SendMoney.parseAmount(wallet.balance || '0');

    return sendAmount > 0.00000000000000001
      && sendAmount <= currentAmount
      && !_.isEmpty(this.state.toEthAddress);
  }

  onSendPress = () => {
    if (this.validateSendData() === false) {
      return;
    }

    this.props.onSendMoney(this.state.amountString, this.state.toEthAddress);
  };

  render() {
    const wallet = this.resolveWallet();
    if (!wallet) {
      return <View />;
    }
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.sendMoney.title')} />

          <PanelView
            style={styles.panelView}
            childrenContainerStyle={styles.noflex}
          >
            <View style={styles.row}>
              <Image style={styles.icon} source={wallet.currency === 'ETH' ? Images.ethereumLogo : Images.patLogo} resizeMode='contain' />
              <View style={styles.textColumn}>
                <Text style={styles.bodyBold}>{wallet.currency === 'ETH' ? i18n.t('common.ethereum') : i18n.t('common.bitnationPat')}</Text>
                <Text style={styles.currencyMedium}>
                  {prettyWalletBalance(wallet, wallet.currency)}
                </Text>
              </View>
            </View>
          </PanelView>

          <PanelView
            style={styles.panelViewTransparent}
            childrenContainerStyle={styles.noflex}
          >
            <View style={styles.formRow}>
              <View style={styles.fieldsContainer}>
                <Text style={styles.amountLabelText}>{i18n.t('common.amount')}</Text>
                <View style={styles.formRow}>
                  <View style={styles.textInputContainer}>
                    <Text style={styles.currencyPlaceholder}>
                      {wallet.currency}
                    </Text>
                    <TextInput
                      style={[styles.textInputInContainer, styles.currencyLarge, styles.currencyNumber]}
                      placeholder='0.00000'
                      placeholderTextColor={Colors.placeholderTextColor}
                      keyboardType='numeric'
                      onChangeText={amountString => this.setState({ amountString })}
                      value={this.state.amountString}
                    />

                  </View>
                </View>
                <Text style={styles.toLabelText}>{i18n.t('common.to')}</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={[styles.textInputInContainer, styles.currencyLarge, styles.currencyNumber]}
                    placeholder='0x'
                    placeholderTextColor={Colors.placeholderTextColor}
                    keyboardType='default'
                    autoCapitalize='none'
                    onChangeText={toEthAddress => this.setState({ toEthAddress })}
                    value={this.state.toEthAddress}
                  />
                </View>
              </View>
            </View>

          </PanelView>

        </View>
        {this.props.moneySendingInProgress ? <Loading /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({
  onSendMoney(amount, toEthAddress) {
    dispatch(sendMoney(amount, toEthAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);

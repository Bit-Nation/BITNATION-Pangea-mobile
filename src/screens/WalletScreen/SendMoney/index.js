import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Images from '../../../global/AssetsImages';
import Colors from '../../../global/colors';
import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import { resolveWallet } from '../../../utils/wallet';
import { sendMoney } from '../../../actions/wallet';
import { androidNavigationButtons, screen } from '../../../global/Screens';
import Loading from '../../../components/common/Loading';
import { prettyWalletBalance } from '../../../utils/formatters';
import i18n from '../../../global/i18n';
import { errorAlert } from '../../../global/alerts';
import PanelView from '../../../components/common/PanelView';
import NavigatorComponent from '../../../components/common/NavigatorComponent';

const SEND_BUTTON = 'SEND_BUTTON';

class SendMoney extends NavigatorComponent {
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
        disabled: !this._validateSendData(),
      }],
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.moneySendingError !== prevProps.moneySendingError && this.props.moneySendingError !== null) {
      errorAlert(this.props.moneySendingError);
    }
    this.updateNavigation();
  }

  showQRCodeScanner = () => {
    this.props.navigator.showModal({
      ...screen('QR_CODE_SCANNER_SCREEN'),
      passProps: {
        onReadCode: this._onReadCode,
      },
    });
  };

  _onReadCode = (event) => {
    this.props.navigator.dismissModal();
    this.setState({ toEthAddress: event.data });
  };

  _resolveWallet() {
    return resolveWallet(this.props.wallets, this.props.selectedWalletAddress);
  }

  _parseAmount() {
    return parseFloat(this.state.amountString) || 0;
  }

  _validateSendData() {
    const wallet = this._resolveWallet();
    const sendAmount = this._parseAmount();
    const currentAmount = wallet.balance;

    return sendAmount > 0.00000000000000001
      && sendAmount <= currentAmount
      && !_.isEmpty(this.state.toEthAddress);
  }

  onSendPress = () => {
    if (!this._validateSendData()) {
      return;
    }

    const amount = this._parseAmount();
    this.props.onSendMoney(amount, this.state.toEthAddress);
  };

  render() {
    const wallet = this._resolveWallet();
    if (!wallet) {
      return <View />;
    }

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>

          <View style={styles.titleContainer}>
            <View style={styles.titleBarLarge}>
              <Text style={styles.largeTitle}>{i18n.t('screens.sendMoney.title')}</Text>
            </View>
          </View>

          <PanelView
            style={styles.panelView}
            childrenContainerStyle={styles.noflex}
          >
            <View style={styles.row}>
              <Image style={styles.icon} source={Images.eth} resizeMode='contain' />
              <View style={styles.textColumn}>
                <Text style={styles.bodyBold}>{i18n.t('common.ethereum')}</Text>
                <Text style={styles.currencyLarge}>{prettyWalletBalance(wallet, wallet.currency)}</Text>
              </View>
            </View>
          </PanelView>

          <PanelView
            style={styles.panelViewTransparent}
            childrenContainerStyle={styles.noflex}
          >
            <View style={styles.formRow}>
              <View style={styles.fieldsContainer}>
                <Text style={[styles.footnote, { marginLeft: 5 }]}>{i18n.t('common.amount')}</Text>
                <View style={styles.formRow}>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      style={[styles.textInputInContainer, styles.currencyLarge]}
                      placeholder='1.02'
                      placeholderTextColor={Colors.placeholderTextColor}
                      keyboardType='numeric'
                      onChangeText={amountString => this.setState({ amountString })}
                      value={this.state.amountString}
                    />
                    <Text style={styles.currencyPlaceholder}>
                      {wallet.currency}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.footnote, { marginLeft: 5, marginTop: 10 }]}>{i18n.t('common.to')}</Text>
                <View style={styles.formRow}>
                  <TextInput
                    style={[styles.textInput, { marginTop: 0 }]}
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

SendMoney.propTypes = {};

SendMoney.defaultProps = {};

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({
  onSendMoney(amount, toEthAddress) {
    dispatch(sendMoney(amount, toEthAddress));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);


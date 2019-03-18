/* eslint-disable no-use-before-define */
// @flow

import React, { Component } from 'react';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { BigNumber } from 'bignumber.js';
import _ from 'lodash';

import i18n from 'pangea-common/i18n';
import GlobalStyles from 'pangea-common-reactnative/styles';
import Colors from 'pangea-common-reactnative/styles/colors';
import type { CurrencyType, WalletType } from 'pangea-common/types/wallet-types';

export type InternalProps = {
  /**
   * @desc Wallets array
   */
  wallets: Array<WalletType>
};

export type Props = {
  /**
   * @desc Style to apply to container view.
   */
  style?: Object,
  /**
   * @desc Function that called on each change.
   */
  onAmountSelected: (amount: string, currency: CurrencyType, walletAddress: string, isValidAmount: boolean, isLessThanBalance: boolean) => void,
  /**
   * @desc Function that called on end editing with result.
   */
  onFinalChange: (amount: string, currency: CurrencyType, walletAddress: string, isValid: boolean, isLessThanBalance: boolean) => void,
  /**
   * @desc Amount to show on a component.
   */
  amount: string,
  /**
   * @desc Currency of selected wallet.
   */
  currency: CurrencyType,
  /**
   * @desc Flag whether to allow user to change currency.
   */
  changeCurrencyEnabled?: boolean,
}

export default class AmountSelect extends Component<Props & InternalProps> {
  static defaultProps: Object = {
    changeCurrencyEnabled: true,
  };

  constructor(props: Props & InternalProps) {
    super(props);

    this.reportFinalChange();
  }

  onSelectWallet = (index: number) => {
    if (index < this.props.wallets.length) {
      const wallet = this.props.wallets[index];
      this.props.onAmountSelected(
        this.props.amount,
        wallet.currency,
        wallet.ethAddress,
        this.isValidAmount(this.props.amount),
        this.isLessThanBalance(this.props.amount, wallet),
      );
      this.reportFinalChange();
    }
  };

  onChangeAmount = (amount: string) => {
    const wallet = this.getWallet();
    if (wallet == null) return;

    this.props.onAmountSelected(
      amount,
      wallet.currency,
      wallet.ethAddress,
      this.isValidAmount(amount),
      this.isLessThanBalance(this.props.amount, wallet),
    );
  };

  getWallet(): ?WalletType {
    this.props.wallets[0].currency = 'ETH';
    return _.find(this.props.wallets, (wallet => wallet.currency === this.props.currency));
  }

  reportFinalChange = () => {
    const wallet = this.getWallet();
    if (wallet == null) return;

    this.props.onFinalChange(
      this.props.amount,
      wallet.currency,
      wallet.ethAddress,
      this.isValidAmount(this.props.amount),
      this.isLessThanBalance(this.props.amount, wallet),
    );
  };

  isValidAmount(amount: string): boolean {
    if (amount == null || amount.length === 0) return false;

    try {
      const bnAmount = new BigNumber(amount);
      if (bnAmount.isZero()) return false;
      if (!bnAmount.isFinite()) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  isLessThanBalance(amount: string, wallet: WalletType): boolean {
    if (amount == null || amount.length === 0) return false;

    try {
      const bnAmount = new BigNumber(amount);
      if (bnAmount.isZero()) return false;
      if (!bnAmount.isFinite()) return false;
      return bnAmount.lessThanOrEqualTo(new BigNumber(wallet.balance));
    } catch (e) {
      return false;
    }
  }

  actionSheet: any;

  render() {
    const walletToShow = this.getWallet();
    if (walletToShow == null) return null;

    const { balance: balanceString } = walletToShow;
    const balanceToShow = balanceString == null ?
      i18n.t('common.updating') :
      `${walletToShow.currency} ${i18n.t('common.balance')} ${balanceString}`;
    const walletOptions = this.props.wallets.map(wallet => wallet.currency)
      .concat(i18n.t('common.cancel'));

    return (
      <View style={[this.props.style, styles.container]}>
        <View style={styles.textsView}>
          <Text style={GlobalStyles.footnote}>
            {i18n.t('common.amount')}
          </Text>
          <Text style={[GlobalStyles.currencyMedium, styles.balanceText]}>
            {balanceToShow}
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <TouchableOpacity
            disabled={this.props.changeCurrencyEnabled === false}
            onPress={() => this.actionSheet.show()}
          >
            <Text style={styles.currencyPlaceholder}>
              {walletToShow.currency}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.textInputInContainer, GlobalStyles.currencyLarge, styles.currencyNumber, styles.textInput]}
            placeholder='0.00000'
            placeholderTextColor={Colors.placeholderTextColor}
            onChangeText={this.onChangeAmount}
            onEndEditing={this.reportFinalChange}
            value={this.props.amount}
            keyboardType='numeric'
          />
          <ActionSheet
            ref={(o) => {
              this.actionSheet = o;
            }}
            options={walletOptions}
            cancelButtonIndex={walletOptions.length - 1}
            onPress={this.onSelectWallet}
          />
        </View>
      </View>
    );
  }
}

const styles = MediaQueryStyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  textsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginLeft: 12,
    marginRight: 12,
  },
  balanceText: {
    ...GlobalStyles.currencyMedium,
    color: Colors.BitnationDarkGrayColor,
  },
  textInputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    height: 50,
  },
  currencyNumber: {
    fontWeight: 'normal',
    color: Colors.BitnationHighlightColor,
  },
  textInput: {
    flex: 1,
  },
  currencyPlaceholder: {
    ...GlobalStyles.currencyLarge,
    color: Colors.placeholderTextColor,
    marginTop: 6,
    fontSize: 15,
    marginRight: 12,
  },
});

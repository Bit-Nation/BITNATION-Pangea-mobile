/* eslint-disable no-use-before-define */
// @flow

import React, { Component } from 'react';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { Text, TextInput } from 'react-native';

import type { WalletType } from '../../types/Wallet';
import View from '../dApps/View';
import i18n from '../../global/i18n';
import GlobalStyles from '../../global/Styles';
import Colors from '../../global/colors';

type Props = {
  /**
   * @desc Style to apply to container view.
   */
  style: Object,
  /**
   * @desc Wallets array
   */
  wallets: Array<WalletType>
};

type State = {
  selectedAmount: number,
  selectedWalletIndex: number,
}

export default class AmountSelect extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedAmount: 0,
      selectedWalletIndex: 0,
    };
  }

  render() {
    const walletToShow = this.props.wallets[this.state.selectedWalletIndex];
    const { balance: balanceString } = walletToShow;
    const balanceToShow = balanceString == null ?
      i18n.t('common.updating') :
      `${walletToShow.currency} ${i18n.t('common.balance')} ${balanceString}`;

    return (
      <View style={[this.props.style, styles.container]}>
        <View style={styles.textsView}>
          <Text style={GlobalStyles.footnote}>
            {i18n.t('common.amount')}
          </Text>
          <Text style={GlobalStyles.currencyMedium}>
            {balanceToShow}
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.currencyPlaceholder}>
            {walletToShow.currency}
          </Text>
          <TextInput
            style={[styles.textInputInContainer, GlobalStyles.currencyLarge, styles.currencyNumber]}
            placeholder='0.00000'
            placeholderTextColor={Colors.placeholderTextColor}
            onChangeText={selectedAmount => this.setState({ selectedAmount })}
            value={this.state.selectedAmount}
            keyboardType='numeric'
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
    marginLeft: 8,
    marginRight: 8,
  },
  textsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginLeft: 12,
    marginRight: 12,
  },
  textInputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  currencyNumber: { fontWeight: 'normal', color: Colors.BitnationLinkOrangeColor },
  currencyPlaceholder: {
    ...GlobalStyles.currencyLarge,
    color: Colors.placeholderTextColor,
    marginTop: 6,
    fontSize: 15,
    marginRight: 12,
  },
});

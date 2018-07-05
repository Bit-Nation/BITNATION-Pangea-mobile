import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { BigNumber } from 'bignumber.js';

import type { ProvidedProps } from '../../components/nativeDApps/DAppProvider';
import Button from '../../components/common/Button';
import i18n from '../../global/i18n';
import Colors from '../../global/colors';
import GlobalStyles from '../../global/Styles';
import { errorAlert } from '../../global/alerts';
import type { ProfileType } from '../../types/Chat';

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  textInputInContainer: {
    ...GlobalStyles.textInput,
    marginBottom: 0,
    marginTop: 0,
    borderBottomWidth: 0,
  },
  currencyNumber: {
    fontWeight: 'normal',
    color: Colors.BitnationGrayColor,
  },
  toLabelText: {
    ...GlobalStyles.footnote,
    marginLeft: 5,
    marginTop: 10,
  },
  sendButton: {
    backgroundColor: Colors.BitnationHighlightColor,
    height: 50,
    borderRadius: 0,
    marginTop: 16,
  },
  block: {
    marginTop: 8,
    marginBottom: 8,
  },
  currencyPlaceholder: {
    ...GlobalStyles.currencyLarge,
    color: Colors.placeholderTextColor,
    marginTop: 6,
    fontSize: 15,
    marginRight: 12,
  },
});

export type SendMoneyMessageData = {
  amount: string,
  currency: string,
  fromAddress: string,
  fromName: string,
  toAddress: string,
  txHash: string,
  to: ProfileType,
  isLoading: boolean,
}

export default class Modal extends React.Component<ProvidedProps, *> {
  constructor(props: ProvidedProps) {
    super(props);

    this.state = {
      from: {
        amount: '0',
        currency: 'ETH',
        isValid: false,
      },
      to: {
        amount: '0',
        currency: 'XPAT',
      },
      rate: '',
      lastEditedFields: ['from', 'rate'],
    };

    BigNumber.config({ ERRORS: false, DECIMAL_PLACES: 10 });
  }

  onButtonPress = async () => {
    try {
      this.props.components.setLoadingVisible(true);
      // const address = await this.props.services.ethereumService.ethereumAddressFromPublicKey(this.props.context.friend.ethereum_pub_Key);
      // const result = await this.props.services.walletService.sendMoney(this.state.currency, address, this.state.amount);
      //
      // const data: SendMoneyMessageData = {
      //   amount: this.state.amount,
      //   currency: this.state.currency,
      //   fromAddress: this.state.fromAddress,
      //   toAddress: address,
      //   txHash: result.hash,
      //   to: this.props.context.friend,
      //   fromName: this.props.context.currentAccount.name,
      // };
      //
      // this.props.services.sendMessage('SEND_MESSAGE', '', data, () => {
      //   this.props.navigation.dismiss();
      // });
    } catch (error) {
      if (error.isCancelled === true) {
        return;
      }
      errorAlert(error);
    } finally {
      this.props.components.setLoadingVisible(false);
    }
  };

  onAmountSelected(field: 'from' | 'to', amount, currency, walletAddress, isValid) {
    this.handleUpdate(field, amount, currency, isValid);
  }

  onChangeRate = (rateString: string) => {
    this.handleUpdate('rate', rateString);
  };

  handleUpdate(field: 'from' | 'to' | 'rate', amount, currency, isValid) {
    this.setState((prevState) => {
      const resultState = {
        ...prevState,
        lastEditedFields: prevState.lastEditedFields[1] === field ?
          prevState.lastEditedFields :
          [prevState.lastEditedFields[1], field],
      };
      if (field === 'from' || field === 'to') {
        resultState[field] = {
          amount,
          currency,
          isValid,
        };
        const oppositeField = field === 'from' ? 'to' : 'from';
        if (prevState[field].currency !== currency) {
          resultState[oppositeField].currency = resultState[field].currency === 'ETH' ? 'XPAT' : 'ETH';
        }
      }
      if (field === 'rate') {
        resultState.rate = amount;
      }

      const fieldToUpdate = ['from', 'to', 'rate'].filter(str => resultState.lastEditedFields.includes(str) === false)[0];

      switch (fieldToUpdate) {
        case 'rate':
          resultState.rate = this.calculateRate(resultState.from.amount, resultState.to.amount);
          break;
        case 'from':
          resultState.from.amount = this.calculateFrom(resultState.rate, resultState.to.amount);
          break;
        case 'to':
          resultState.to.amount = this.calculateTo(resultState.from.amount, resultState.rate);
          break;
        default:
          break;
      }

      return resultState;
    });
  }

  calculateRate = (fromString, toString) => {
    let from = new BigNumber(fromString);
    let to = new BigNumber(toString);
    if (!from.isFinite()) from = new BigNumber(0);
    if (!to.isFinite()) to = new BigNumber(0);
    let result = from.div(to);
    if (result.isFinite() === false) result = new BigNumber(0);
    return result.toString(10);
  };

  calculateFrom = (rateString, toString) => {
    let rate = new BigNumber(rateString);
    let to = new BigNumber(toString);
    if (!rate.isFinite()) rate = new BigNumber(0);
    if (!to.isFinite()) to = new BigNumber(0);
    let result = to.mul(rate);
    if (result.isFinite() === false) result = new BigNumber(0);
    return result.toString(10);
  };

  calculateTo = (fromString, rateString) => {
    let from = new BigNumber(fromString);
    let rate = new BigNumber(rateString);
    if (!from.isFinite()) from = new BigNumber(0);
    if (!rate.isFinite()) rate = new BigNumber(0);
    let result = from.div(rate);
    if (result.isFinite() === false) result = new BigNumber(0);
    return result.toString(10);
  };

  isValid() {
    return this.state.from.isValid === true
      && (new BigNumber(this.state.from.amount)).isFinite() === true
      && (new BigNumber(this.state.to.amount)).isFinite() === true
      && (new BigNumber(this.state.rate)).isFinite() === true
      && (new BigNumber(this.state.to.amount)).isZero() === false
      && (new BigNumber(this.state.from.amount)).isZero() === false
      && (new BigNumber(this.state.rate)).isZero() === false;
  }

  render() {
    return (
      <View>
        <View style={styles.block}>
          {this.props.components.renderAmountSelect({
            onAmountSelected: (amount, currency, address, isValid) => this.onAmountSelected('from', amount, currency, address, isValid),
            shouldCheckLess: true,
            amount: this.state.from.amount,
            currency: this.state.from.currency,
            walletAddress: this.state.from.address,
          }, false)}
        </View>
        <View style={styles.block}>
          <View style={styles.textInputContainer}>
            <Text style={styles.currencyPlaceholder}>
              {`${this.state.from.currency}:${this.state.to.currency}`}
            </Text>
            <TextInput
              style={[styles.textInputInContainer, GlobalStyles.currencyLarge, styles.currencyNumber]}
              onChangeText={this.onChangeRate}
              value={this.state.rate}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={styles.block}>
          {this.props.components.renderAmountSelect({
            onAmountSelected: (amount, currency, address, isValid) => this.onAmountSelected('to', amount, currency, address, isValid),
            shouldCheckLess: false,
            amount: this.state.to.amount,
            currency: this.state.to.currency,
            walletAddress: this.state.to.address,
          }, false)}
        </View>
        <Button
          styleTitle={GlobalStyles.title3}
          style={styles.sendButton}
          title={i18n.t('dApps.escrow.requestExchange')}
          onPress={this.onButtonPress}
          enabled={this.isValid()}
        />
      </View>
    );
  }
}

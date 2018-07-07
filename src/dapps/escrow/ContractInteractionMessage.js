/* eslint-disable react/sort-comp */
// @flow

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BigNumber } from 'bignumber.js';

import Colors from '../../global/colors';
import i18n from '../../global/i18n';
import type { ProvidedProps as MessageProvidedProps } from '../../components/nativeDApps/MessageProvider';
import type { MessageData } from './Constants';
import Button from '../../components/common/Button';
import { alert, errorAlert } from '../../global/alerts';

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: Colors.BitnationDarkGrayColor,
  },
  textBold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  spacer: { height: 12 },
});

type OwnProps = {
  /**
   * @desc Smart contract object of escrow contract.
   */
  contract: Object,
  /**
   * @desc Address of deployed smart contract.
   */
  contractAddress: string,
}

type Status = 'unknown' | 'pending' | 'readyForWithdraw' | 'withdrawn' | 'drained';

type State = {
  contractStatus: Status,
  userHasSpends: boolean,
}

type Props = MessageData & OwnProps & MessageProvidedProps

export default class ContractInteractionMessage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      contractStatus: 'unknown',
      userHasSpends: false,
    };
  }

  timeoutHandler: ?number;

  componentWillMount() {
    this.startFetching();
  }

  componentWillUnmount() {
    this.stopFetching();
  }

  startFetching = async (oneTime: boolean = false) => {
    try {
      const [status, userHasSpends] = await this.fetchStatus();
      this.setState({ contractStatus: status, userHasSpends });
    } catch (error) {
      console.log(`[Escrow DApp] Failed to fetch contract info with error ${error.message}`);
    }
    if (oneTime === false) {
      this.timeoutHandler = setTimeout(this.startFetching, 8000);
    }
  };

  fetchStatus = async (): Promise<[Status, boolean]> => {
    const withdrawn = await this.props.contract.withdrawled();
    const agreedEtherAmount = new BigNumber(this.props.etherAmount);
    const etherBalance = new BigNumber(await this.props.services.ethereumService.getOtherBalance(this.props.contractAddress));
    const agreedTokenAmount = new BigNumber(this.props.tokenAmount);
    const tokenBalance = new BigNumber(await this.props.services.ethereumService.getOtherTokenBalance(this.props.tokenContractAddress, this.props.contractAddress));

    const userHasSpends = this.props.tokensFromAddress === this.props.context.walletAddress
      ? tokenBalance.isZero() === false
      : etherBalance.isZero() === false;

    if (withdrawn === true) {
      return ['withdrawn', userHasSpends];
    }

    if (etherBalance.lessThan(agreedEtherAmount)) {
      return ['drained', userHasSpends];
    }

    if (tokenBalance.lessThan(agreedTokenAmount)) {
      return ['pending', userHasSpends];
    }

    return ['readyForWithdraw', userHasSpends];
  };

  stopFetching = () => {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
    }
  };

  onPressSend = async () => {
    await this.props.services.sendMoney('XPAT', this.props.contractAddress, this.props.tokenAmount);
  };

  onPressWithdraw = async () => {
    await this.completeContract();
  };

  onPressCancel = async () => {
    alert('dApps.escrow.cancelConfirmationAlert', [
      { name: 'confirm', onPress: this.cancelContract },
      { name: 'cancel', style: 'cancel' },
    ]);
  };

  cancelContract = async () => {
    try {
      await this.props.contract.drain();
      await this.startFetching(true);
    } catch (error) {
      errorAlert(error);
    }
  };

  completeContract = async () => {
    try {
      await this.props.contract.withdrawal();
      await this.startFetching(true);
    } catch (error) {
      errorAlert(error);
    }
  };

  renderStatus(status: Status) {
    const shouldShowSendTokens = this.props.tokensFromAddress === this.props.context.walletAddress && status === 'pending';
    if (status === 'unknown') {
      return (
        <Text style={styles.textBold}>
          Checking smart contract status.
        </Text>
      );
    }

    const statusText = (() => {
      switch (this.state.contractStatus) {
        case 'pending':
          return shouldShowSendTokens
            ? 'Send XPAT to complete exchange'
            : `Waiting for ${this.props.tokensFromName} to complete exchange`;
        case 'readyForWithdraw':
          return 'Smart contract is ready to proceed exchange.\n' +
            'Press exchange to confirm withdrawal transaction.\n' +
            'Only one party need to do that.';
        case 'withdrawn':
          return 'Exchange finished.\n' +
            'Check out your wallets.';
        case 'drained':
          return 'Exchange was aborted.\n' +
            'Funds are returned back.';
        default:
          return '';
      }
    })();

    return (
      <View>
        <Text style={styles.textBold}>
          {statusText}
        </Text>
        <View style={styles.spacer} />
        <View style={styles.buttonContainer}>
          {
            shouldShowSendTokens &&
            <Button
              onPress={this.onPressSend}
              title={i18n.t('dApps.escrow.sendTokens')}
            />
          }
          {
            this.state.contractStatus === 'readyForWithdraw' &&
            <Button
              onPress={this.onPressWithdraw}
              title={i18n.t('dApps.escrow.completeContract')}
            />
          }
          {
            this.state.userHasSpends === true &&
            <Button
              onPress={this.onPressCancel}
              title={i18n.t('dApps.escrow.cancelContract')}
            />
          }
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>
          Exchange{'\n'}
          of <Text style={styles.textBold}>{this.props.etherAmount} ETH{'\n'}</Text>
          for <Text style={styles.textBold}>{this.props.tokenAmount} XPAT</Text>
        </Text>
        <View style={styles.spacer} />
        {
          this.renderStatus(this.state.contractStatus)
        }
      </View>
    );
  }
}

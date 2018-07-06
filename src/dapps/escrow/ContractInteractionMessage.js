/* eslint-disable react/sort-comp */
// @flow

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import i18n from '../../global/i18n';
import type { ProvidedProps as MessageProvidedProps } from '../../components/nativeDApps/MessageProvider';
import type { MessageData } from './Constants';
import Button from '../../components/common/Button';
import { alert } from '../../global/alerts';

const styles = StyleSheet.create({
  container: { margin: 5 },
  text: {
    fontSize: 17,
    color: Colors.BitnationDarkGrayColor,
  },
  textBold: {
    fontWeight: 'bold',
  },

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
}

type Props = MessageData & OwnProps & MessageProvidedProps

export default class ContractInteractionMessage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      contractStatus: 'unknown',
    };
  }

  timeoutHandler: ?number;

  componentWillMount() {
    this.startFetching();
  }

  componentWillUnmount() {
    this.stopFetching();
  }

  startFetching = async () => {
    await this.fetch().catch((error) => {
      console.log(`[Escrow DApp] Failed to fetch contract info with error ${error.message}`);
    });
    this.timeoutHandler = setTimeout(this.startFetching, 8000);
  };

  fetch = async () => {
    const withdrawn = await this.props.contract.functions.withdrawled;
    if (withdrawn === true) {
      this.setState({ contractStatus: 'withdrawn' });
      return Promise.resolve();
    }

    const tokenBalance = await this.props.services.ethereumService.getTokenBalance(this.props.tokenContractAddress);
  };

  stopFetching = () => {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
    }
  };

  onPressSend = async () => {
    await this.props.services.sendMoney('XPAT', this.props.contractAddress, this.props.tokenAmount);
  };

  onPressCancel = async () => {
    alert('dApps.escrow.cancelConfirmationAlert', [
      { name: 'confirm', onPress: this.cancelContract },
      { name: 'cancel', style: 'cancel' },
    ]);
  };

  cancelContract = async () => {
    // @todo Cancel contract
  };

  shouldShowSendTokens = () => this.props.tokensFromAddress === this.props.context.walletAddress;

  renderSuccess() {
    const shouldShowSendTokens = this.shouldShowSendTokens();

    return (
      <View>
        <Text style={styles.textBold}>
          {shouldShowSendTokens
            ? 'Send XPAT to complete exchange'
            : `Waiting for ${this.props.tokensFromName} to complete exchange`
          }
        </Text>
        <View>
          {
            shouldShowSendTokens &&
            <Button
              onPress={this.onPressSend}
              title={i18n.t('dApps.escrow.sendTokens')}
            />
          }
          <Button
            onPress={this.onPressCancel}
            title={i18n.t('dApps.escrow.cancelContract')}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Exchange of {this.props.etherAmount} ETH to {this.props.tokenAmount} XPAT is initiated.
        </Text>
        {
          this.state.contractStatus === 'unknown' ?
            <Text style={styles.textBold}>
              Checking smart contract status.
            </Text>
            :
            this.renderSuccess()
        }
      </View>
    );
  }
}

// @flow

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import i18n from '../../global/i18n';
import type { ProvidedProps as MessageProvidedProps } from '../../components/nativeDApps/MessageProvider';
import type { ExchangeInitiatedMessageData } from './Constants';
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
   * @desc Flag whether send button should be shown.
   */
  shouldShowSendTokens: boolean,
}

type Status = 'pending' | 'failed' | 'success';

type State = {
  contractStatus: Status,
}

type Props = ExchangeInitiatedMessageData & OwnProps & MessageProvidedProps

export default class ExchangeInitiatedMessage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      contractStatus: 'pending',
    };

    this.trackDeployTransaction();
  }

  onPressSend = async () => {
    // @todo Get address to send tokens.
    const address = '0x0';
    await this.props.services.sendMoney('XPAT', address, this.props.tokenAmount);
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

  trackDeployTransaction = async () => this.props.services.ethereumService.trackTransaction(this.props.deployTxHash).then(() => {
    this.setState({ contractStatus: 'success' });
  }).catch(() => {
    this.setState({ contractStatus: 'failed' });
  });

  renderSuccess() {
    return (
      <View>
        <Text style={styles.textBold}>
          {this.props.shouldShowSendTokens
            ? 'Send XPAT to complete exchange'
            : `Waiting for ${this.props.tokensFromName} to complete exchange`
          }
        </Text>
        <View>
          {
            this.props.shouldShowSendTokens &&
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
    const statusText = (() => {
      switch (this.state.contractStatus) {
        case 'pending':
          return 'Checking contract status';
        case 'failed':
          return 'Contract failed to deploy';
        case 'success':
          return 'Contract deployed';
        default:
          return '';
      }
    })();

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Exchange of {this.props.etherAmount} ETH to {this.props.tokenAmount} XPAT is initiated.
        </Text>
        {this.state.status === 'success' && this.renderSuccess()}
        {this.state.status !== 'success' && (
          <Text style={styles.textBold}>
            {statusText}
          </Text>)
        }
      </View>
    );
  }
}

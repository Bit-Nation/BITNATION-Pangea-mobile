/* eslint-disable prefer-destructuring,class-methods-use-this */
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import type { ProvidedProps as MessageProvidedProp } from '../../components/nativeDApps/MessageProvider';
import { SendMoneyMessageData } from './Modal';
import type { ProfileType } from '../../types/Chat';

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

type Status = 'pending' | 'failed' | 'success';

type State = {
  status: Status,
  txHash: string,
  to: ProfileType,
  amount: string,
  currency: string,
  fromAddress: string,
  fromName: string,
  invalidMessage: boolean,
}

export default class Message extends React.Component<MessageProvidedProp, State> {
  constructor(props) {
    super(props);

    const params: string = this.props.context.dAppMessage.params;
    const data: SendMoneyMessageData = JSON.parse(params);

    this.state = {
      status: 'pending',
      ...data,
      invalidMessage: this.validateParams(data) === false,
    };

    this.trackTransaction();
  }

  validateParams(data: SendMoneyMessageData) {
    return data.amount != null
      && data.currency != null
      && data.to != null
      && data.to.name != null
      && data.fromAddress != null
      && data.toAddress != null
      && data.txHash != null;
  }

  trackTransaction = async () => this.props.services.ethereumService.trackTransaction(this.state.txHash).then(() => {
    this.setState({ status: 'success' });
  }).catch(() => {
    this.setState({ status: 'failed' });
  });

  render() {
    if (this.state.invalidMessage) {
      return null;
    }

    const statusText = (() => {
      switch (this.state.status) {
        case 'pending':
          return 'Checking status';
        case 'failed':
          return 'Send failed';
        case 'success':
          return 'Money sent';
        default:
          return '';
      }
    })();

    return (
      <View style={styles.container}>
        <Text style={styles.textBold}>
          {statusText}
        </Text>
        <Text style={styles.text}>
          Send {this.state.amount} {this.state.currency} from {this.state.fromName} to {this.state.to.name}
        </Text>
      </View>
    );
  }
}

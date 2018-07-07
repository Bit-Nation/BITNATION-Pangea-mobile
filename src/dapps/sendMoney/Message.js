// @flow

/* eslint-disable prefer-destructuring,class-methods-use-this */
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import type { ProvidedProps as MessageProvidedProps } from '../../components/nativeDApps/MessageProvider';
import { MessageParamsValidator } from '../../components/nativeDApps/MessageParamsValidator';
import type { SendMoneyMessageData } from './Modal';

const styles = StyleSheet.create({
  container: { margin: 8 },
  text: {
    fontSize: 17,
    color: Colors.BitnationDarkGrayColor,
  },
  textBold: {
    fontWeight: 'bold',
  },

});

type Status = 'pending' | 'failed' | 'success';

type OwnProps = {
  data: SendMoneyMessageData,
}

type State = {
  status: Status,
}

type Props = MessageProvidedProps & OwnProps;

class Message extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      status: 'pending',
    };

    this.trackTransaction();
  }

  trackTransaction = async () => this.props.services.ethereumService.trackTransaction(this.props.data.txHash).then(() => {
    this.setState({ status: 'success' });
  }).catch(() => {
    this.setState({ status: 'failed' });
  });

  render() {
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
        <Text style={styles.text}>
          {`Send ${this.props.data.amount} ${this.props.data.currency}\nfrom ${this.props.data.fromName}\nto ${this.props.data.to.name}`}
        </Text>
        <Text style={styles.textBold}>
          {statusText}
        </Text>
      </View>
    );
  }
}

export default MessageParamsValidator(Message, (data: Object) =>
  data.amount != null
  && data.currency != null
  && data.to != null
  && data.to.name != null
  && data.fromAddress != null
  && data.toAddress != null
  && data.txHash != null);

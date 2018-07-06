// @flow

/* eslint-disable prefer-destructuring,class-methods-use-this */
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ProvidedProps as MessageProvidedProps } from '../../components/nativeDApps/MessageProvider';
import { MESSAGE_TYPES } from './Constants';
import ExchangeInitiatedMessage from './ExchangeInitiatedMessage';

const styles = StyleSheet.create({
  container: { margin: 5 },
});

export default class Message extends React.Component<MessageProvidedProps, *> {
  constructor(props: MessageProvidedProps) {
    super(props);

    const params: string = this.props.context.dAppMessage.params;
    const messageType = this.props.context.dAppMessage.type;
    const data = JSON.parse(params);

    this.state = {
      data,
      invalidMessage: this.validateParams(data, messageType) === false,
    };
  }

  validateParams(data: Object, type: string) {
    switch (type) {
      case MESSAGE_TYPES.EXCHANGE_INITIATED:
        return data.amount != null
          && data.currency != null
          && data.to != null
          && data.to.name != null
          && data.fromAddress != null
          && data.toAddress != null
          && data.txHash != null;
      default:
        return false;
    }
  }

  render() {
    if (this.state.invalidMessage) {
      return null;
    }

    return (
      <View style={styles.container}>
        {this.props.context.dAppMessage.type === MESSAGE_TYPES.EXCHANGE_INITIATED
        && <ExchangeInitiatedMessage {...this.state.data} />}
      </View>
    );
  }
}

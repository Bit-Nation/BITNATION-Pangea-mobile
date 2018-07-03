// @flow

import * as React from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/common/Button';
import type { DAppType } from '../index';
import type { ProvidedProps } from '../../components/nativeDApps/DAppProvider';
import type { ProvidedProps as MessageProvidedProp } from '../../components/nativeDApps/MessageProvider';

const dApp: DAppType = {
  name: 'send / receive money',
  identityPublicKey: '0x@todo',
  modal: class extends React.Component<ProvidedProps, *> {
    constructor(props: ProvidedProps) {
      super(props);

      this.state = {
        amount: '',
        currency: '',
        address: '',
      };
    }

    onAmountSelected = (amount: string, currency: string, address: string) => {
      this.setState({ amount, currency, address });
    };

    onButtonPress = () => {
      this.props.services.sendMessage('TEST_TYPE', '', { something: 90 }, () => {
      });
    };

    isValid(): boolean {
      try {
        const amount = parseFloat(this.state.amount);
        return amount < 10;
      } catch (e) {
        return false;
      }
    }

    render() {
      console.log(`[DAPP] ${this.props.context.friend.ethereum_pub_Key}`);
      return (
        <View>
          {this.props.components.renderAmountSelect({
            onAmountSelected: this.onAmountSelected,
          })}
          <Button title='SEND' onPress={this.onButtonPress} enabled={this.isValid()} />
          <Text>
            {this.props.context.friend.ethereum_pub_Key}
            {this.props.context.friend.name}
          </Text>
        </View>
      );
    }
  },
  message: class extends React.Component<MessageProvidedProp> {
    render() {
      return (
        <View>
          <Text>
            {this.props.context.dAppMessage.params}
          </Text>
        </View>
      );
    }
  },
};

export default dApp;

import * as React from 'react';
import { Text, View } from 'react-native';

import type { ProvidedProps } from '../../components/nativeDApps/DAppProvider';
import Button from '../../components/common/Button';

export default class Modal extends React.Component<ProvidedProps, *> {
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
    this.props.services.sendMessage('TEST_TYPE', '', { data: { ...this.state, to: this.props.context.friend.name } }, () => {
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
}

import * as React from 'react';
import { Text, View } from 'react-native';

import type { ProvidedProps as MessageProvidedProp } from '../../components/nativeDApps/MessageProvider';

export default class Message extends React.Component<MessageProvidedProp> {
  render() {
    return (
      <View>
        <Text>
          {this.props.context.dAppMessage.params}
        </Text>
      </View>
    );
  }
}

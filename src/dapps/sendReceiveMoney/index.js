// @flow

import * as React from 'react';
import { Text, View } from 'react-native';
import type { DAppType } from '../index';
import type { ProvidedProps } from '../../components/nativeDApps/DAppProvider';

const dApp: DAppType = {
  name: 'send / receive money',
  identityPublicKey: '0x@todo',
  modal: class extends React.Component<ProvidedProps> {
    render() {
      return (
        <View>
          <Text>
            {"I'm a DApp"}.
          </Text>
        </View>
      );
    }
  },
  message: class extends React.Component {

  },
};

export default dApp;

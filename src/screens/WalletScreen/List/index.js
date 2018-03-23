// @flow

import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';

import styles from './styles';
import Images from '../../../global/AssetsImages';
import WalletCard from '../../../components/WalletCard';
import { prettyWalletBalance } from '../../../utils/formatters';
import type { WalletType } from '../../../types/Wallet';

type Props = {
  wallets: Array<WalletType>,
  onReceivePress: (WalletType) => void,
  onSendPress: (WalletType) => void,
}

/**
 * @desc Component that renders wallet list.
 * It is used inside parent component, so doesn't contain navigation etc.
 * @return {React.Component} A component.
 * @constructor
 */
const WalletList = ({ wallets, onReceivePress, onSendPress }: Props) => ((
  <View style={styles.walletListContainer}>
    <FlatList
      data={wallets}
      keyExtractor={item => item.ethAddress}
      renderItem={({ item }) => {
        const balance = prettyWalletBalance(item, 'ETH');

        return (<WalletCard
          imagePath={Images.ethereumLogo}
          onSendPress={() => onSendPress(item)}
          onReceivePress={() => onReceivePress(item)}
          nameHeading={item.name}
          balance={balance}
        />);
      }}
    />
  </View>
));

export default WalletList;

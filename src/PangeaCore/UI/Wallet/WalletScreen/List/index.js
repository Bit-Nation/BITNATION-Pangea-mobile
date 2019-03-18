// @flow

import React from 'react';
import {
  FlatList,
  View,
  RefreshControl,
} from 'react-native';

import styles from './styles';
import Images from 'pangea-common-reactnative/assets/AssetsImages';
import WalletCard from '../../../components/WalletCard';
import { prettyWalletBalance } from '@pangea/wallet/formatters';
import type { WalletType } from 'pangea-common/types/wallet-types';

type Props = {
  wallets: Array<WalletType>,
  onReceivePress: (WalletType) => void,
  onSendPress: (WalletType) => void,
  onTransactionPress: (WalletType) => void,
  onRefresh: () => void,
  isRefreshing: boolean,
}

/**
 * @desc Component that renders wallet list.
 * It is used inside parent component, so doesn't contain navigation etc.
 * @return {React.Component} A component.
 * @constructor
 */
const WalletList = ({
  wallets,
  onReceivePress,
  onSendPress,
  onTransactionPress,
  onRefresh,
  isRefreshing,
}: Props) => ((
  <View style={styles.walletListContainer}>
    <FlatList
      data={wallets}
      keyExtractor={item => item.currency}
      renderItem={({ item }) => {
        const balance = prettyWalletBalance(item, item.currency);
        return (<WalletCard
          imagePath={item.currency === 'ETH' ? Images.ethereumLogo : Images.xpatLogo}
          onSendPress={() => onSendPress(item)}
          onReceivePress={() => onReceivePress(item)}
          onTransactionPress={() => onTransactionPress(item)}
          nameHeading={item.name}
          balance={balance}
        />);
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => onRefresh()}
        />}
    />
  </View>
));

export default WalletList;

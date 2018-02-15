/*
    Wallet List (Wallet)
    
    Return a ScrollView with panels for creating or restoring a wallet, to fit
    inside a normal screen view.
    
    It does NOT need a bodyContainer.
    This does not return a complete screen.
    There is no navigation, etc.
    
    
 */

import React, { Component } from 'react';
import {
  FlatList,
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Images from '../../../global/AssetsImages';
import WalletCard from '../../../components/WalletCard';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import { prettyWalletBalance } from '../../../utils/formatters';
import i18n from '../../../global/i18n';

export default class WalletList extends Component {

  render() {
    return (
      <View style={styles.walletListContainer}>
        <FlatList
          data={this.props.wallets}
          keyExtractor={item => item.ethAddress}
          renderItem={({ item }) => {
            const balance = prettyWalletBalance(item,
              'ETH');

            return (<WalletCard
              imagePath={Images.ethereumLogo}
              onSendPress={() => this.props.onSendPress(
                item)}
              onReceivePress={() => this.props.onReceivePress(
                item)}
              nameHeading={item.name}
              balance={balance}>
            </WalletCard>);
          }}
        />
      </View>
    );
  }

}

WalletList.PropTypes = {
  onSendPress: PropTypes.func.isRequired,
  onReceivePress: PropTypes.func.isRequired,
};
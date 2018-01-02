import React, { Component } from 'react';
import {
  Text, Image, FlatList, Button, ListItem,
  View, TouchableOpacity
} from 'react-native';
import styles from './styles';
import Background from '../../components/common/BackgroundImage';
import Images from '../../global/AssetsImages';
import MessageView from '../../components/common/MessageView';

export default class WalletScreen extends Component {

  constructor(props) {
    super(props);
    this.createWallet = this.createWallet.bind(this);
    this.restoreWallet = this.restoreWallet.bind(this);
  }


  Variables = [
    heading1 = 'Create a Wallet',
    discp1 = 'A wallet is a small, flat case that can be used to carry such personal items as cash, credit cards, and identification documents (driver\'s license, identification card, club card, etc.',
    heading2 = 'Restore a Wallet',
    discp2 = 'In addition to money or currency, a wallet would also be used for carrying dried meat, victuals, treasures, and things not to be exposed. Wallets originally were used by early Industrial Americans',
  ];

  items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];

  createWallet() {
    this.props.navigator.push({
      screen: 'Pangea.CreateKeyStep1',
    });
  };

  restoreWallet() {
    this.props.navigator.push({
      screen: 'Pangea.VarifyKeyStep1',
    });
  }

  renderWalletDiscription(heading, discp, onClick) {
    return (
      <View style={styles.cardMain}>
        <Text style={styles.discpHeading}>{heading}</Text>
        <Text style={styles.discpText}>{discp}</Text>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={onClick}>
          <View style={styles.discpButton}>
            <Text style={styles.discpButtonText}>{heading}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Background/>
        <Text style={styles.header}>Wallet</Text>
        {/* {this.renderWalletDiscription(this.Variables[0], this.Variables[1],this.createWallet)} */}
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.firstCard]}>
            <MessageView
              title={this.Variables[0]}
              messageText={this.Variables[1]}
              buttonTitle='Create a Wallet'
              onButtonClick={this.createWallet}
            />
          </View>

          <View style={styles.card}>
            <MessageView
              title={this.Variables[2]}
              messageText={this.Variables[3]}
              buttonTitle='Restore a Wallet'
              onButtonClick={this.restoreWallet}
            />
          </View>
        </View>
      </View>
    );
  }
}

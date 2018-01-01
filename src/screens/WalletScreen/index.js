
import React, { Component } from 'react';
import {
    Text, Image, FlatList, Button, ListItem,
    View, TouchableOpacity
} from 'react-native';
import styles from './styles';
import Images from '../../global/AssetsImages';
import WalletCard from '../../components/WalletCard';
import WalletList from '../WalletScreen/List';

export default class WalletScreen extends Component{
    
    Variables = [
        heading1 = "Create a Wallet",
        discp1 = "A wallet is a small, flat case that can be used to carry such personal items as cash, credit cards, and identification documents (driver's license, identification card, club card, etc.",
        heading2 = "Restore a Wallet",
        discp2 = "In addition to money or currency, a wallet would also be used for carrying dried meat, victuals, treasures, and things not to be exposed. Wallets originally were used by early Industrial Americans",
    ];

    items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];
    
    renderBackgroundImage(){
        return(
            <Image style={styles.backgroundScreen} resizeMode="contain"
            source={Images.background}/>
        );
    }

    renderWalletDiscription(heading, discp){
        return(
            <View style={styles.cardMain}>
                <Text style={styles.discpHeading}>{heading}</Text>
                <Text style={styles.discpText}>{discp}</Text>
                <TouchableOpacity style={{alignItems:'center'}}>
                    <View style={styles.discpButton}>
                            <Text style={styles.discpButtonText}>{heading}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

    renderWalletList(){
        
        var items = [
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Waleed'},
            {key: 'Farooqi'},
            {key: 'Mehmood'},
            {key: 'Mutahar'},
            {key: 'Maqbool'},
            {key: 'Saad'},
            {key: 'Waneed'},
            {key: 'Parkash'},
            {key: 'Dhawan'},
            {key: 'Raja'},
            {key: 'Rola'},
            {key: 'Ali'},
            {key: 'Raza'},
            {key: 'Jadu'},
        ];
 
        items.push('');
        items.push('');
        items.push('');
        
                return (
                    <FlatList
                        data={items}
                        keyExtractor={item => item.key}
                        renderItem={({item}) => <WalletCard
                            imagePath={Images.ethereumLogo}
                            nameHeading={item.key}>
                        </WalletCard>}/>
                );
    }

    render(){
        return(
            <View>
                {this.renderBackgroundImage()} 
                
                <Text style={styles.header}>Wallet</Text>
                <View style={styles.flatListStyle}>
                    {/* {this.renderWalletList()} */}
                    {this.renderWalletDiscription(this.Variables[0],this.Variables[1])}
                    {this.renderWalletDiscription(this.Variables[2],this.Variables[3])}
                </View>
            </View>
        );
    }

}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);

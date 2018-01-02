import React, { Component } from 'react';
import {
    Text, Image, FlatList, Button, ListItem,
    View, TouchableOpacity
} from 'react-native';
import styles from './styles';
import Images from '../../../global/AssetsImages';
import WalletCard from '../../../components/WalletCard';

export default class WalletList extends Component{

    constructor(props)
    {
        super(props);
        this.onSendPress = this.onSendPress.bind(this);
        this.onRecievePress = this.onRecievePress.bind(this);
    }
    
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

    onSendPress(key){
        console.log("on Send press ", key);
    }

    onRecievePress(key){
        console.log("on recieve press", key);
    }

    renderWalletList(){
        
        var items = [
            {key: 'Devin',url:'david url'},
            {key: 'Jackson',url:'jakson url'},
            {key: 'James',url:'James url'},
            {key: 'Joel',url:'Joel url'},
            {key: 'John',url:'John url'},
            {key: 'Jillian',url:'Jillian url'},
            {key: 'Waleed',url:'Waleed url'},
            {key: 'Farooqi',url:'Farooqi url'},
            {key: 'Mehmood',url:'jakson url'},
            {key: 'Mutahar',url:'jakson url'},
            {key: 'Maqbool',url:'jakson url'},
            {key: 'Saad',url:'jakson url'},
            {key: 'Waneed',url:'jakson url'},
            {key: 'Parkash',url:'jakson url'},
            {key: 'Dhawan',url:'jakson url'},
            {key: 'Raja',url:'jakson url'},
            {key: 'Rola',url:'jakson url'},
            {key: 'Ali',url:'jakson url'},
            {key: 'Raza',url:'jakson url'},
            {key: 'Jadu',url:'jakson url'},
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
                        onSendPress={() => this.onSendPress(item)}
                        onRecievePress = {() => this.onRecievePress(item)}
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
                    {this.renderWalletList()}
                </View>
            </View>
        );
    }

}

import React, { Component } from 'react';
import {
    ListView, Text, Image, Button,
    View, TouchableOpacity
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import Images from '../../global/AssetsImages';

const WalletCard = (props) => {

    return(
        <View style={styles.container}>

            <View style={styles.titleContainer}>

                <View style={{flexDirection:'row'}}>
                    <Image style={styles.avatar} source={props.imagePath}/>

                    <View style={styles.discriptionColumn}>
                        <Text style={styles.nameHeading}>{props.nameHeading}</Text>
                        <Text style={styles.nameSubheading}>{props.nameSubheading}</Text>
                    </View>
                    <Image style={styles.nextButton} resizeMode={"contain"} source={Images.rightArrow}/>

                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={{flexDirection:'row', width:'90%', height:'90%'}}>
                    <TouchableOpacity style={styles.buttonBoxStyle}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Send</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBoxStyle}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Receive</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBoxStyle}>
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Ledger</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.messageText}>{props.messageText}</Text>
            </View>
        </View>
    );

}

WalletCard.propTypes = {
    
    imagePath : PropTypes.string,
    nameHeading : PropTypes.string,
    nameSubheading : PropTypes.string,
    messageText : PropTypes.string,
};
    
WalletCard.defaultProps = {
    imagePath : 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    nameHeading : "Ethernum",
    nameSubheading : "173324 Enum",
    messageText : "Message goes here",
};


export default WalletCard;

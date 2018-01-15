import React, { Component } from 'react';
import {
    ListView, Text, Image, Button,
    View, TouchableOpacity
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';


const Header = (props) => {
    
    return(

        <View style={styles.container}>
            <View style={styles.headerBar}>

                <TouchableOpacity style={styles.navButton} onPress={props.onLeftButtonPress}  disabled={props.leftButtonDisabled}>
                    <Text style={styles.navButtonText}>{props.leftButtonTitle}</Text>
                </TouchableOpacity>

                <View style={styles.navHeader}>
                    <Text style={styles.navHeaderText}>{props.headerTitle}</Text>
                </View>
                <TouchableOpacity style={styles.navButton} onPress={props.onRightButtonPress}  disabled={props.rightButtonDisabled}>
                    <Text style={styles.navButtonText}>{props.rightButtonTitle}</Text></TouchableOpacity>
            </View>
        </View>
    );
}

Header.propTypes = {

    leftButtonTitle : PropTypes.string,
    rightButtonTitle : PropTypes.string,
    headerTitle : PropTypes.string,
    onLeftButtonPress : PropTypes.func,
    onRightButtonPress : PropTypes.func,
    leftButtonDisabled : PropTypes.bool,
    rightButtonDisabled : PropTypes.bool,

};

Header.defaultProps = {

    leftButtonTitle : 'Cancel',
    rightButtonTitle : 'Next',
    headerTitle : '',
    onLeftButtonPress : () => {console.log("onLeftButtonPressed();")},
    onRightButtonPress : () => {console.log("onRightButtonPressed();")},
    leftButtonDisabled : false,
    rightButtonDisabled : false,
};

export default Header;

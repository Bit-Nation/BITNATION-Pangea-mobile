import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Images from '../../../../global/AssetsImages';
import styles from './styles';
import Colors from '../../../../global/Colors';
import Header from '../../../../components/Header';
import Screens from '../../../../global/Screens';
import Button from '../../../../components/Button';

class VarifyKeyStep1 extends Component {

  onNextButtonPressed() {
    this.props.navigator.push(Screens.VERIFY_KEY_SCREEN_STEP_3);
  }

  onCancelButtonPressed() {
    alert('cancel');
  }

  render() {
    return (

      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={Images.background}
        />

        <Text style={styles.title}>Verify Private Key</Text>
        <View style={styles.wholeText}>

          <Text style={styles.description}>Now that you have written down your private key, we will ask you to verify
            it.</Text>
          <Text style={styles.description}>You will type the 12 words of your private key into the app, and we will
            check that your written private key is correct.</Text>
          <Text style={styles.description}>Your private key protects everything in Bitnation, so be sure to put your
            paper with your private key in a safe place.</Text>

        </View>

        <View style={styles.buttonContainer}>
          <Button title='Begin'
                  onPress={() => this.onNextButtonPressed()}/>
        </View>
      </View>
    );
  }
}

VarifyKeyStep1.propTypes = {};

VarifyKeyStep1.defaultProps = {};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VarifyKeyStep1);

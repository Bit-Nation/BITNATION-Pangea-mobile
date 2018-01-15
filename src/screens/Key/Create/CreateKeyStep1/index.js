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

class CreateKeyStep1 extends Component {

  onNextButtonPressed() {
    this.props.navigator.push(Screens.CREATE_KEY_SCREEN_STEP_2);
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

        <Text style={styles.title}>Create a Private Key</Text>

        <View style={styles.wholeText}>

          <Text style={styles.description}>To use a secure blockchain, you need a "private key". We will make your
            private key for you.</Text>
          <Text style={styles.description}>We require you to write down your private key on paper. This process only
            takes a few minutes.</Text>
          <Text style={styles.description}>If your phone is lost, stolen, broken, or upgraded, the only way to restore
            your wallet is by entering your private key!</Text>
          <Text style={styles.description}>We recommend writing on paper because if your key is on your computer or
            phone, someone might steal it.</Text>
          <Text style={styles.description}>Your private key protects everything in Bitnation, so be sure to put your
            paper with with your private key in a safe place.</Text>

        </View>

        <View style={styles.buttonContainer}>
          <Button title='Begin'
                  onPress={() => this.onNextButtonPressed()}/>
        </View>

      </View>
    );
  }
}

CreateKeyStep1.propTypes = {};

CreateKeyStep1.defaultProps = {};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyStep1);

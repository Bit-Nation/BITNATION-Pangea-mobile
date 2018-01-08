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
import Button from '../../../../components/common/Button';

class VarifyKeySuccess extends Component {

  onNextButtonPressed() {
    this.props.navigator.popToRoot();
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

        <View style={styles.wholeText}>

          <Text style={styles.description}>Congratulations, you correctly entered your private key.</Text>
          <Text style={[styles.description, styles.applyBold]}>Now, put your paper with your private key in a safe place.</Text>

        </View>

        <View style={styles.buttonContainer}>
          <Button title='Done'
                  onPress={() => this.onNextButtonPressed()}/>
        </View>

      </View>
    );
  }
}

VarifyKeySuccess.propTypes = {};

VarifyKeySuccess.defaultProps = {};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VarifyKeySuccess);

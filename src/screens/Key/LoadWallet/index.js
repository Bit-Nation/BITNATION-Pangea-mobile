import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../global/Screens';
import Button from '../../../components/common/Button';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import KeyBaseScreen from '../KeyBaseScreen';
import { changeEnteredMnemonic, removePrivateKey } from '../../../actions/key';
import { KEY_LENGTH } from '../../../global/Constants';
import BodyParagraphs from '../../../components/common/BodyParagraphs';
import i18n from '../../../global/i18n';

class LoadWalletScreen extends KeyBaseScreen {

  onNextButtonPressed() {
    this.props.navigator.push(screen('VERIFY_KEY_PROCESS_SCREEN'));
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>

        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <BodyParagraphs paragraphs={i18n.t('screens.loadWallet.instructions', { KEY_LENGTH })}/>

          <View style={styles.buttonContainer}>
            <Button title={i18n.t('screens.loadWallet.startButton')}
                    onPress={() => this.onNextButtonPressed()}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

LoadWalletScreen.propTypes = {};

LoadWalletScreen.defaultProps = {};

const mapStateToProps = state => ({
  ...state.key,
});

const mapDispatchToProps = dispatch => ({
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
  changeMnemonic(mnemonic) {
    dispatch(changeEnteredMnemonic(mnemonic));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadWalletScreen);
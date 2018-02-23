import React, { Component } from 'react';
import {
  View,
  Text,
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
import PanelView from '../../../components/common/PanelView';

class LoadWalletScreen extends KeyBaseScreen {
  onNextButtonPressed() {
    this.props.navigator.push(screen('VERIFY_KEY_PROCESS_SCREEN'));
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />

        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            {/* TITLE OF SCREEN */}
            <View style={styles.titleBarLarge}>
              <Text style={styles.largeTitle}>
                {i18n.t('screens.loadWallet.title')}
              </Text>
            </View>
          </View>


          <PanelView
            style={styles.panelViewTransparent}
            childrenContainerStyle={styles.noflex}
            buttonTitle={i18n.t('screens.loadWallet.startButton')}
            onButtonClick={() => this.onNextButtonPressed()}
          >
            <BodyParagraphs paragraphs={i18n.t('screens.loadWallet.instructions', { KEY_LENGTH })} />

          </PanelView>
        </View>
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

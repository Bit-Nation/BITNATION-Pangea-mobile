// @flow

import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../global/Screens';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import KeyBaseScreen from '../KeyBaseScreen';
import { removePrivateKey } from '../../../actions/key';
import { KEY_LENGTH } from '../../../global/Constants';
import BodyParagraphs from '../../../components/common/BodyParagraphs';
import i18n from '../../../global/i18n';
import PanelView from '../../../components/common/PanelView';
import type { State } from '../../../reducers/key';

type Actions = {
  /**
   * @desc Function to abort private key creation process.
   */
  removePrivateKey: () => void,
}

class LoadWalletScreen extends KeyBaseScreen<Actions & State> {
  onNextButtonPressed() {
    if (this.props.navigator) {
      this.props.navigator.push(screen('VERIFY_KEY_PROCESS_SCREEN'));
    }
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

const mapStateToProps = state => ({
  ...state.key,
});

const mapDispatchToProps = dispatch => ({
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadWalletScreen);

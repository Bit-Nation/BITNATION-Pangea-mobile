// @flow

import React from 'react';
import {
  View,
  ScrollView,
  Image,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import PanelView from '../../../../components/common/PanelView';
import { KEY_LENGTH } from '../../../../global/Constants';
import KeyBaseScreen from '../../KeyBaseScreen/index';
import { createPrivateKey, removePrivateKey } from '../../../../actions/key';
import AssetsImages from '../../../../global/AssetsImages';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';
import type { State } from '../../../../reducers/key';

type Actions = {
  /**
   * @desc Function to start private key creation process.
   */
  createPrivateKey: () => void,
  /**
   * @desc Function to abort private key creation process.
   */
  removePrivateKey: () => void,
}

class CreateKeyInstructionScreen extends KeyBaseScreen<Actions & State> {
  onNextButtonPressed() {
    this.props.createPrivateKey();
    if (this.props.navigator) {
      this.props.navigator.push(screen('CREATE_KEY_PROCESS_SCREEN'));
    }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />

        <View style={styles.bodyContainer}>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.noflex}>
            <PanelView
              style={styles.panelViewTransparent}
              buttonTitle={i18n.t('screens.createKey.startButton')}
              onButtonClick={() => this.onNextButtonPressed()}
            >
              <BodyParagraphs paragraphs={i18n.t('screens.createKey.instructions.beforeGrid', { KEY_LENGTH })} />
              <View style={styles.gridContainer}>
                <Image
                  style={styles.privateKeyDemoImage}
                  resizeMode='contain'
                  source={AssetsImages.privateKeyDemo}
                />
              </View>
              <BodyParagraphs paragraphs={i18n.t('screens.createKey.instructions.afterGrid')} />

            </PanelView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.key,
});

const mapDispatchToProps = dispatch => ({
  createPrivateKey() {
    dispatch(createPrivateKey());
  },
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyInstructionScreen);

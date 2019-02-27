// @flow

import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import { androidNavigationButtons, screen } from 'pangea-common-reactnative/Screens';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import { KEY_LENGTH } from 'pangea-common/Constants';
import BodyParagraphs from 'pangea-common-reactnative/UI/BodyParagraphs';
import i18n from 'pangea-common/i18n';
import type { State } from '@pangea/key/key-reducers';
import NavigatorComponent from '../../../NavigatorComponent';

class VerifyKeyInstructionScreen extends NavigatorComponent<State> {
  static navigatorButtons = { ...androidNavigationButtons };

  onNextButtonPressed = () => {
    if (this.props.navigator) {
      this.props.navigator.push(screen('VERIFY_KEY_PROCESS_SCREEN'));
    }
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />

        <View style={styles.bodyContainer}>
          <PanelView
            style={styles.panelViewTransparent}
            childrenContainerStyle={styles.noflex}
            buttonTitle={i18n.t('screens.verifyKey.startButton')}
            onButtonClick={this.onNextButtonPressed}
          >
            <BodyParagraphs paragraphs={i18n.t('screens.verifyKey.instructions', { KEY_LENGTH })} />
          </PanelView>
        </View>
      </View>
    );
  }
}

export default VerifyKeyInstructionScreen;

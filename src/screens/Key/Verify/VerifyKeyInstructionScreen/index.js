// @flow

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { androidNavigationButtons, screen } from '../../../../global/Screens';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import PanelView from '../../../../components/common/PanelView';
import { KEY_LENGTH } from '../../../../global/Constants';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';
import type { State } from '../../../../reducers/key';
import NavigatorComponent from '../../../../components/common/NavigatorComponent';

class VerifyKeyInstructionScreen extends NavigatorComponent<State> {
  static navigatorButtons = { ...androidNavigationButtons };

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
          <PanelView
            style={styles.panelViewTransparent}
            childrenContainerStyle={styles.noflex}
            buttonTitle={i18n.t('screens.verifyKey.startButton')}
            onButtonClick={() => this.onNextButtonPressed()}
          >
            <BodyParagraphs paragraphs={i18n.t('screens.verifyKey.instructions', { KEY_LENGTH })} />
          </PanelView>
        </View>
      </View>
    );
  }
}

export default VerifyKeyInstructionScreen;

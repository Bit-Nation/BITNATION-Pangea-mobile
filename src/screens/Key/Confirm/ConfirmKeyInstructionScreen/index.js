// @flow

import React from 'react';
import {
  View,
  ScrollView,
  Image,
} from 'react-native';

import styles from './styles';
import { androidNavigationButtons, screen } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import PanelView from '../../../../components/common/PanelView';
import { KEY_LENGTH } from '../../../../global/Constants';
import AssetsImages from '../../../../global/AssetsImages';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';
import NavigatorComponent from '../../../../components/common/NavigatorComponent';

class ConfirmKeyInstructionScreen extends NavigatorComponent<void> {
  static navigatorButtons = { ...androidNavigationButtons };

  onNextButtonPressed() {
    if (this.props.navigator) {
      this.props.navigator.push(screen('CONFIRM_KEY_PROCESS_SCREEN'));
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
              buttonTitle={i18n.t('screens.confirmKey.startButton')}
              onButtonClick={() => this.onNextButtonPressed()}
            >
              <BodyParagraphs paragraphs={i18n.t('screens.confirmKey.instructions.beforeGrid', { KEY_LENGTH })} />
              <View style={styles.gridContainer}>
                <Image
                  style={styles.privateKeyDemoImage}
                  resizeMode='contain'
                  source={AssetsImages.privateKeyDemo}
                />
              </View>
              <BodyParagraphs paragraphs={i18n.t('screens.confirmKey.instructions.afterGrid')} />

            </PanelView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ConfirmKeyInstructionScreen;

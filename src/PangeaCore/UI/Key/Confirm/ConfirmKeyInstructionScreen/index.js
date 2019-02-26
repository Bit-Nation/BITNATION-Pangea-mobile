// @flow

import React from 'react';
import {
  View,
  ScrollView,
  Image,
} from 'react-native';

import styles from './styles';
import { androidNavigationButtons, screen } from 'pangea-common-reactnative/Screens';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import { KEY_LENGTH } from 'pangea-common/Constants';
import AssetsImages from 'pangea-common-reactnative/assets/AssetsImages';
import BodyParagraphs from 'pangea-common-reactnative/UI/BodyParagraphs';
import i18n from 'pangea-common/i18n';
import NavigatorComponent from 'pangea-common-reactnative/UI/NavigatorComponent';
import type { NavigatorProps } from 'pangea-common-reactnative/UI/NavigatorComponent';
import Colors from 'pangea-common-reactnative/styles/colors';

type Props = {
  shouldShowCancel: boolean,
};

class ConfirmKeyInstructionScreen extends NavigatorComponent<Props> {
  static defaultProps;

  constructor(props: Props & NavigatorProps) {
    super(props);

    props.navigator.setButtons({
      leftButtons: props.shouldShowCancel ? [{
        id: 'cancel',
        title: 'Cancel',
        buttonColor: Colors.navigationButtonColor,
      }] : [],
      ...androidNavigationButtons,
    });
  }

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.navigator.dismissModal();
    }
  }

  onNextButtonPressed = () => {
    if (this.props.navigator) {
      this.props.navigator.push(screen('CONFIRM_KEY_PROCESS_SCREEN'));
    }
  };

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
              onButtonClick={this.onNextButtonPressed}
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

ConfirmKeyInstructionScreen.defaultProps = {
  shouldShowCancel: false,
};

export default ConfirmKeyInstructionScreen;

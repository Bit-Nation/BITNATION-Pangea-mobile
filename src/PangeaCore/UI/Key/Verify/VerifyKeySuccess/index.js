// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import BodyParagraphs from 'pangea-common-reactnative/UI/BodyParagraphs';
import i18n from 'pangea-common/i18n';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import NavigatorComponent from 'pangea-common-reactnative/UI/NavigatorComponent';

class VerifyKeySuccess extends NavigatorComponent<void> {
  static navigatorButtons = { leftButtons: [], rightButtons: [] };

  onNextButtonPressed = () => {
    if (this.props.navigator) {
      this.props.navigator.popToRoot();
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
            buttonTitle={i18n.t('screens.verifyKey.success.doneButton')}
            onButtonClick={this.onNextButtonPressed}
          >
            <BodyParagraphs paragraphs={i18n.t('screens.verifyKey.success.instructions')} />
          </PanelView>

        </View>
      </View>
    );
  }
}

export default VerifyKeySuccess;

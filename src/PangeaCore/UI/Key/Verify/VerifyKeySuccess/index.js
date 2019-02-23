// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';
import PanelView from '../../../../components/common/PanelView';
import NavigatorComponent from '../../../../components/common/NavigatorComponent';

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

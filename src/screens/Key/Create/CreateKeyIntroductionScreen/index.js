// @flow

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../../global/Screens';
import PanelView from '../../../../components/common/PanelView';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import KeyBaseScreen from '../../KeyBaseScreen';
import { removePrivateKey } from '../../../../actions/key';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';
import type { State } from '../../../../reducers/key';
import ScreenTitle from '../../../../components/common/ScreenTitle';

type Actions = {
  /**
   * @desc Function to abort private key creation process.
   */
  removePrivateKey: () => void,
}

class CreateKeyIntroductionScreen extends KeyBaseScreen<Actions & State> {
  onNextButtonPressed() {
    if (this.props.navigator) {
      this.props.navigator.push(screen('CREATE_KEY_INSTRUCTION_SCREEN'));
    }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />

        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.createKey.title')} />

          <PanelView
            style={styles.panelViewTransparent}
            childrenContainerStyle={styles.noflex}
            buttonTitle={i18n.t('screens.createKey.startButton')}
            onButtonClick={() => this.onNextButtonPressed()}
          >
            <BodyParagraphs paragraphs={i18n.t('screens.createKey.introduction')} />

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyIntroductionScreen);

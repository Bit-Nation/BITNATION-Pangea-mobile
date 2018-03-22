// @flow

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import { removePrivateKey, savePrivateKey } from '../../../../actions/key';
import KeyBaseScreen from '../../KeyBaseScreen';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';
import PanelView from '../../../../components/common/PanelView';
import type { State } from '../../../../reducers/key';

type Actions = {
  savePrivateKey: () => void,
  removePrivateKey: () => void,
}

class VerifyKeySuccess extends KeyBaseScreen<State & Actions> {
  onNextButtonPressed() {
    this.props.savePrivateKey();
    if (this.props.navigator) {
      this.props.navigator.dismissModal();
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
            buttonTitle={i18n.t('screens.verifyKey.success.doneButton')}
            onButtonClick={() => this.onNextButtonPressed()}
          >
            <BodyParagraphs paragraphs={i18n.t('screens.verifyKey.success.instructions')} />
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
  savePrivateKey() {
    dispatch(savePrivateKey());
  },
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyKeySuccess);

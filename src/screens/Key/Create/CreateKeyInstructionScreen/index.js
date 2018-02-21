import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

class CreateKeyInstructionScreen extends KeyBaseScreen {
  onNextButtonPressed() {
    this.props.createPrivateKey();
    this.props.navigator.push(screen('CREATE_KEY_PROCESS_SCREEN'));
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />

        <View style={styles.bodyContainer}>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 0 }}>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  createPrivateKey() {
    dispatch(createPrivateKey());
  },
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyInstructionScreen);

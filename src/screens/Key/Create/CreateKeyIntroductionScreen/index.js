import React, { Component } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../../global/Screens';
import Button from '../../../../components/common/Button';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import KeyBaseScreen from '../../KeyBaseScreen';
import { removePrivateKey } from '../../../../actions/key';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';

class CreateKeyIntroductionScreen extends KeyBaseScreen {

  onNextButtonPressed() {
    this.props.navigator.push(screen('CREATE_KEY_INSTRUCTION_SCREEN'));
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <ScrollView contentContainerStyle={styles.bodyContainer}>
          <BodyParagraphs paragraphs={i18n.t('screens.createKey.introduction')}/>

          <View style={styles.buttonContainer}>
            <Button title={i18n.t('screens.createKey.startButton')}
                    onPress={() => this.onNextButtonPressed()}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

CreateKeyIntroductionScreen.propTypes = {};

CreateKeyIntroductionScreen.defaultProps = {};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyIntroductionScreen);

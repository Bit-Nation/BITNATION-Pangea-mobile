// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import i18n from '../../../global/i18n';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import PanelView from '../../../components/common/PanelView';
import ScreenTitle from '../../../components/common/ScreenTitle';
import Button from '../../../components/common/Button';
import SecuritySettings from './SecuritySettings';
import styles from '../styles';

const steps = [
  'security-settings',
  'set-password',
  'passcode',
  'verify-passcode',
  'developer-settings',
  'create-identity'
];

type Props = {
};

class CreateAccount extends Component<Props> {

  constructor(props: Props) {
    super(props);
    this.state = {
      step: 0,

    };
    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this._renderCreateSteps = this._renderCreateSteps.bind(this);
  }

  previousStep() {
    if (this.state.step > 0) {
      this.setState({
        step: this.state.step - 1
      });
    }
  }

  nextStep() {
    if (this.state.step < steps.length - 1) {
      this.setState({
        step: this.state.step + 1
      });
    }
  }

  _renderCreateSteps() {
    switch(this.state.step) {
      case 0:
        return <SecuritySettings />
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
    }
  }

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.create.title')} />
          <View style={styles.bodyContainer}>
            {this._renderCreateSteps()}
          </View>
          <View style={styles.buttonContainerMultiple}>
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.create.prev')}
              enabled={this.state.step !== 0}
              onPress={this.previousStep}
            />
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.create.next')}
              enabled={this.state.step !== (steps.length - 1)}
              onPress={this.nextStep}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);

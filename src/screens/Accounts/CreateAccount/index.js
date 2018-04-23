// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import i18n from '../../global/i18n';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import PanelView from '../../components/common/PanelView';
import ScreenTitle from '../../components/common/ScreenTitle';
import Button from '../../components/common/Button';
import styles from './styles';

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

  consturctor(props: Props) {
    super(props);
    this.state = {
      step: 0,

    };
    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
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

  render() {
    return (
      <View style={{}}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.accounts.create.title')} />
        
        <View>
          <Button
            style={styles.panelButton}
            title={'Prev'}
            enabled={this.state.step !== 0}
            onPress={this.previousStep}
          />
          <Button
            style={styles.panelButton}
            title={'Next'}
            enabled={this.state.step !== (steps.length - 1)}
            onPress={this.nextStep}
          />
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

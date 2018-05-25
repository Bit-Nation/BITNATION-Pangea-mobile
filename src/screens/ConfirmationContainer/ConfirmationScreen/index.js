

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Slider,
} from 'react-native';

import BackgroundImage from '../../../components/common/BackgroundImage';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import ScreenTitle from '../../../components/common/ScreenTitle';
import PanelView from '../../../components/common/PanelView';
import Colors from '../../../global/colors';
import styles from './styles';
import i18n from '../../../global/i18n';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import { type State as ConfirmationState } from '../../../reducers/confirmation';

type Props = {
  navigator: Navigator,
}

type Actions = {
  onCancelConfirmation: () => void,
  onSendConfirmation: () => void,
}

class ConfirmationScreen extends NavigatorComponent<Props & Actions & ConfirmationState> {
  static defaultProps: Object;

  constructor(props: Props & Actions & ConfirmationState) {
    super(props);

    if (this.props.navigator) {
      this.props.navigator.setButtons({
        leftButtons: [{
          title: i18n.t('screens.createNation.cancelButton'),
          id: 'cancel',
          buttonColor: Colors.navigationButtonColor,
        }],
        rightButtons: [{
          title: i18n.t('screens.confirmTransaction.confirmButton'),
          id: 'confirm',
          buttonColor: Colors.navigationButtonColor,
        }],
      });
    }
  }
  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.onCancelConfirmation();
    } else {
      this.props.onSendConfirmation();
    }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />

        <View style={styles.bodyContainer}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.noflex}>
            <ScreenTitle title={i18n.t('screens.confirmTransaction.title')} />
            {ConfirmationScreen.buildConfirmationView()}
          </ScrollView>
        </View>
      </View>
    );
  }

  static getVal(val) {
    console.log('Gas Price set:', val);
  }
  static buildConfirmationView() {
    return (
      <PanelView
        style={styles.panelViewTransparent}
      >
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <View style={styles.bodyParagraph}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.gasPrice')}
              </Text>
            </View>
            <View style={styles.fieldsContainer}>
              <Slider
                style={styles.gridContainer}
                step={1}
                minimumValue={2}
                maximumValue={100}
                value={this.state.gasPrice}
                onValueChange={val => this.setState({ gasPrice: val })}
                onSlidingComplete={val => this.getVal(val)}
              />
            </View>
          </View>
        </View>
      </PanelView>
    );
  }
}

ConfirmationScreen.defaultProps = {
  gasPrice: 2,
  onCancelConfirmation: () => null,
  onSendConfirmation: () => null,
};

export default ConfirmationScreen;


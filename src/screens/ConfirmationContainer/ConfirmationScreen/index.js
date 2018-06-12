// @flow

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

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to return the Promise resolve
   * @param {number} gasPrice Number with the gasPrice selected by the user for the current transaction
   */
  onSuccess: (gasPrice: number) => null,
  /**
   * @desc Function to return the Promise reject
   */
  onFail: () => null,
}

type State = {
  /**
   * @desc gasPrice to return in resolve
   */
  gasPrice: number,
}

class ConfirmationScreen extends NavigatorComponent<Props, State> {
  static defaultProps: Object;

  constructor(props: Props) {
    super(props);
    this.state = {
      gasPrice: 2,
    };

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
  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.onFail();
    } else {
      this.props.onSuccess(this.state.gasPrice);
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
            {this.buildConfirmationView()}
          </ScrollView>
        </View>
      </View>
    );
  }


  buildConfirmationView() {
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
              />
            </View>
            <View style={styles.fieldsContainer}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.gasPriceTitle', { gasPrice: this.state.gasPrice })}
              </Text>
            </View>
          </View>
        </View>
      </PanelView>
    );
  }
}

export default ConfirmationScreen;


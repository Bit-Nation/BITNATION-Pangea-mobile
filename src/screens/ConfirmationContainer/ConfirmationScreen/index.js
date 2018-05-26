

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
  navigator: Navigator,
}

type State = {
  gasPrice: number,
}

class ConfirmationScreen extends NavigatorComponent<Props, State> {
  static defaultProps: Object;

  constructor(props: Props) {
    super(props);
    this.state = {
      gasPrice: 2,
    };

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
      this.props.onFail();
    } else {
      this.props.onSuccess();
    }
  }

  render() {
    console.log('---> Props on Screen:', this.props);
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />

        <View style={styles.bodyContainer}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.noflex}>
            <ScreenTitle title={i18n.t('screens.confirmTransaction.title')} />
            {ConfirmationScreen.buildConfirmationView(this)}
          </ScrollView>
        </View>
      </View>
    );
  }

  static getVal(val) {
    console.log('Gas Price set:', val);
  }

  static buildConfirmationView(instance) {
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
                value={instance.state.gasPrice}
                onValueChange={val => instance.setState({ gasPrice: val })}
                onSlidingComplete={val => instance.getVal(val)}
              />
            </View>
          </View>
        </View>
      </PanelView>
    );
  }
}

export default ConfirmationScreen;


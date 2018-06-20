// @flow

import React from 'react';
import ethers from 'ethers';
import {
  View,
  Text,
  TextInput,
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
  onSuccess: (gasPrice: number, gasLimit: number) => null,
  /**
   * @desc Function to return the Promise reject
   */
  onFail: () => null,
  /**
   * @desc Object with the properties of the transaction
   */
  to: String,
  from: String,
  amount: String,
  estimate: String,
  purpose: String,
  app: String,
}

type State = {
  /**
   * @desc gasPrice to return in resolve
   */
  gasPrice: number,
  gasLimit: number
}

class ConfirmationScreen extends NavigatorComponent<Props, State> {
  static defaultProps: Object;

  constructor(props: Props) {
    super(props);
    this.state = {
      gasPrice: 2,
      gasLimit: '1500000',
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
      this.props.onSuccess(this.state.gasPrice, this.state.gasLimit);
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
    let speed;
    if (this.state.gasPrice < 10) {
      speed = i18n.t('screens.confirmTransaction.slow');
    } else if (this.state.gasPrice < 30) {
      speed = i18n.t('screens.confirmTransaction.quick');
    } else if (this.state.gasPrice < 60) {
      speed = i18n.t('screens.confirmTransaction.fast');
    } else {
      speed = i18n.t('screens.confirmTransaction.fastest');
    }
    const amount = ethers.utils.bigNumberify(this.props.amount);
    const gasEstimate = ethers.utils.bigNumberify(this.props.estimate).mul(ethers.utils.parseUnits(this.state.gasPrice.toString(), 'gwei'));
    return (
      <PanelView
        style={styles.panelViewTransparent}
      >
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <View style={styles.bodyParagraphConfirmationRow}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.processor')}
              </Text>
              <Text style={styles.bodyBoldBlack}>
                {this.props.app || 'Default Application'}
              </Text>
            </View>
            <View style={styles.bodyParagraphConfirmationColumn}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.to')}
              </Text>
              <Text style={styles.bodyBoldBlackSmall}>
                {this.props.to}
              </Text>
            </View>
            <View style={styles.bodyParagraphConfirmationRow}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.amount')}
              </Text>
              <Text style={styles.bodyBoldBlack}>
                {ethers.utils.formatEther(amount)} ETH
              </Text>
            </View>
            <View style={styles.bodyParagraphConfirmationRow}>
              <Text style={styles.body}>
                {this.props.purpose || 'Send Ether'}
              </Text>
            </View>
            <View style={styles.bodyParagraphConfirmationRow}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.gasEstimate')}
              </Text>
              <Text style={styles.bodyBoldBlack}>
                {ethers.utils.formatEther(gasEstimate)} ETH
              </Text>
            </View>
            <View style={styles.fieldsContainer}>
              <Slider
                style={styles.gridContainer}
                step={1}
                minimumValue={2}
                maximumValue={60}
                value={this.state.gasPrice}
                onValueChange={val => this.setState({ gasPrice: val })}
              />
            </View>
            <View style={styles.fieldsContainer}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.gasPriceTitle', { gasPrice: this.state.gasPrice })} - {speed}
              </Text>
            </View>
            <View style={styles.bodyParagraphConfirmationRow}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.gasLimit')}
              </Text>
              <View style={styles.textInputContainer}>
                <TextInput
                  style={[styles.textInputInContainer, styles.bodyBoldBlack]}
                  onChangeText={gasLimit => this.setState({ gasLimit })}
                  value={this.state.gasLimit}
                />
              </View>
            </View>
            <View style={styles.fieldsContainer}>
              <View style={styles.bodyParagraphConfirmationRow}>
                <Text style={styles.body}>
                  {i18n.t('screens.confirmTransaction.gasLimit')}:
                </Text>
                <TextInput
                  style={[styles.textInputConfirmation, styles.bodyBoldBlack]}
                  onChangeText={gasLimit => this.setState({ gasLimit })}
                  value={this.state.gasLimit}
                />
              </View>
            </View>
            <View style={styles.bodyParagraphConfirmationRow}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.total')}
              </Text>
              <Text style={styles.bodyBoldBlack}>
                {ethers.utils.formatEther(amount.add(gasEstimate))}
              </Text>
            </View>
          </View>
        </View>
      </PanelView>
    );
  }
}

export default ConfirmationScreen;


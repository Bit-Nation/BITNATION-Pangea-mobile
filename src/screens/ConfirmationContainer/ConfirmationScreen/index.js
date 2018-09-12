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
import { CancelledError } from '../../../global/errors/common';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to return the Promise resolve
   * @param {number} gasPrice Number with the gasPrice selected by the user for the current transaction
   * @param {string} gasLimit string to describe the maximum gas price for this transaction
   */
  onSuccess: (gasPrice: number, gasLimit: string) => null,
  /**
   * @desc Function to return the Promise reject
   */
  onFail: (error: Error) => null,
  /**
   * @desc Object with the properties of the transaction
   */
  to: string,
  from: string,
  amount: string,
  estimate: string,
  purpose: string,
  app: string,
  gasLimit: string,
}

type State = {
  /**
   * @desc gasPrice to return in resolve
   * @desc gasLimit to return in resolve
   */
  gasPrice: number,
  gasLimit: string
}

class ConfirmationScreen extends NavigatorComponent<Props, State> {
  static defaultProps: Object;

  constructor(props: Props) {
    super(props);
    this.state = {
      gasPrice: 2,
      gasLimit: this.props.gasLimit === null ? '21000' : this.props.gasLimit,
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
      this.props.onFail(new CancelledError());
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
                {ethers.utils.formatEther(amount)} {i18n.t('screens.confirmTransaction.eth')}
              </Text>
            </View>
            {this.props.purpose ?
              <View style={styles.bodyParagraphConfirmationRow}>
                <Text style={styles.body}>
                  {this.props.purpose}
                </Text>
              </View> : null}
            <View style={styles.bodyParagraphConfirmationRow}>
              <Text style={styles.body}>
                {i18n.t('screens.confirmTransaction.gasEstimate')}
              </Text>
              <Text style={styles.bodyBoldBlack}>
                {ethers.utils.formatEther(gasEstimate)} {i18n.t('screens.confirmTransaction.eth')}
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
                thumbTintColor={Colors.thumbTintColor}
                maximumTrackTintColor={Colors.maximumTrackTintColor}
                minimumTrackTintColor={Colors.minimumTrackTintColor}
              />
              <View style={styles.textCon}>
                <Text style={styles.colorGrey}>{i18n.t('screens.confirmTransaction.slow')}</Text>
                <Text style={styles.colorYellow}>
                  {this.state.gasPrice} {i18n.t('screens.confirmTransaction.gwei')}
                </Text>
                <Text style={styles.colorGrey}>{i18n.t('screens.confirmTransaction.fast')}</Text>
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
                {ethers.utils.formatEther(amount.add(gasEstimate))} {i18n.t('screens.confirmTransaction.eth')}
              </Text>
            </View>
          </View>
        </View>
      </PanelView>
    );
  }
}

export default ConfirmationScreen;


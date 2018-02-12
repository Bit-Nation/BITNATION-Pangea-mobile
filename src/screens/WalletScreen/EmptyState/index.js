/*
    EmptyState
    
    Return a ScrollView with panels for creating or restoring a wallet, to fit
    inside a normal screen view.
    
    This does not return a complete screen. There is no navigation, etc.
 */

import React, { Component } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import PanelView from '../../../components/common/PanelView';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';

export default class EmptyWalletScreen extends Component {

  render() {
    return (
	    <View style={styles.bodyContainer}>
		    <ScrollView style={styles.scrollView}>
              <PanelView
                title={i18n.t('screens.wallet.empty.createWalletPanel.title')}
                body={i18n.t('screens.wallet.empty.createWalletPanel.text')}
                buttonTitle={i18n.t('screens.wallet.empty.createWalletPanel.button')}
                onButtonClick={this.props.onCreateWallet}
              />
              <PanelView
                title={i18n.t('screens.wallet.empty.restoreWalletPanel.title')}
                body={i18n.t('screens.wallet.empty.restoreWalletPanel.text')}
                buttonTitle={i18n.t('screens.wallet.empty.restoreWalletPanel.button')}
                onButtonClick={this.props.onRestoreWallet}
              />
            </ScrollView>
        </View>
    );
  }
}

EmptyWalletScreen.PropTypes = {
  onCreateWallet: PropTypes.func.isRequired,
  onRestoreWallet: PropTypes.func.isRequired,
};


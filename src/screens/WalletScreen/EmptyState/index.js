/*
    EmptyState (Wallet)
    
    Return a ScrollView with panels for creating or restoring a wallet, to fit
    inside a normal screen view.
    
    It does NOT need a bodyContainer.
    This does not return a complete screen.
    There is no navigation, etc.
    
    
 */

import React, { Component } from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';

export default class EmptyWalletScreen extends Component {

  render() {
    return (
	    <View>
		    {/*<ScrollView contentContainerStyle={styles.scrollView}>*/}
              <PanelView
                style={styles.panelViewTransparent}
                title={i18n.t('screens.wallet.empty.createWalletPanel.title')}
                body={i18n.t('screens.wallet.empty.createWalletPanel.text')}
                buttonTitle={i18n.t('screens.wallet.empty.createWalletPanel.button')}
                onButtonClick={this.props.onCreateWallet}
              />
              <PanelView
	              style={styles.panelViewTransparent}
                title={i18n.t('screens.wallet.empty.restoreWalletPanel.title')}
                body={i18n.t('screens.wallet.empty.restoreWalletPanel.text')}
                buttonTitle={i18n.t('screens.wallet.empty.restoreWalletPanel.button')}
                onButtonClick={this.props.onRestoreWallet}
              />
            {/*</ScrollView>*/}
        </View>
    );
  }
}

EmptyWalletScreen.PropTypes = {
  onCreateWallet: PropTypes.func.isRequired,
  onRestoreWallet: PropTypes.func.isRequired,
};


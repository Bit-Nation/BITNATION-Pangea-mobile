// @flow

import React from 'react';
import { View, ScrollView } from 'react-native';

import styles from './styles';
import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';

type Props = {
  /**
   * @desc Callback when create wallet action selected.
   */
  onCreateWallet: () => void,
  /**
   * @desc Callback when restore wallet action selected.
   */
  onRestoreWallet: () => void,
}

/**
 * @desc Component that renders wallet screen empty state.
 * It is embedded into parent screen, so doesn't contain navigation, etc.
 * @return {React.Component} A component.
 * @constructor
 */
const EmptyWalletScreen = ({ onCreateWallet, onRestoreWallet }: Props) => ((
  <View>
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.noflex}>
      <PanelView
        style={styles.panelViewTransparent}
        title={i18n.t('screens.wallet.empty.createWalletPanel.title')}
        body={i18n.t('screens.wallet.empty.createWalletPanel.text')}
        buttonTitle={i18n.t('screens.wallet.empty.createWalletPanel.button')}
        onButtonClick={onCreateWallet}
      />
      <PanelView
        style={styles.panelViewTransparent}
        title={i18n.t('screens.wallet.empty.restoreWalletPanel.title')}
        body={i18n.t('screens.wallet.empty.restoreWalletPanel.text')}
        buttonTitle={i18n.t('screens.wallet.empty.restoreWalletPanel.button')}
        onButtonClick={onRestoreWallet}
      />
    </ScrollView>
  </View>
));

export default EmptyWalletScreen;

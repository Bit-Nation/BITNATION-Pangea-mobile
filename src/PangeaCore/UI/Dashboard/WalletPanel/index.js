// @flow

import React from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';

import styles from './styles';

import PanelView from 'pangea-common-reactnative/UI/PanelView';
import i18n from 'pangea-common/i18n';
import { prettyWalletBalance } from '@pangea/wallet/formatters';
import { resolveWallet } from '@pangea/wallet/wallet-utils';
import type { WalletType } from 'pangea-common/types/Wallet-types';

type Props = {
  /**
   * @desc Array of wallet objects.
   */
  +wallets: Array<WalletType>,
  /**
   * @desc Style to be applied to root view.
   */
  style: any,
};

/**
 * @desc Component to render wallet panel on dashboard
 * @return {React.Component} A component.
 */
const WalletPanel = ({ style, wallets } : Props) => {
  const patWallet = resolveWallet(wallets, 'XPAT');
  if (patWallet === null) {
    return <View />;
  }
  return (
    <View style={style}>
      <PanelView
        style={styles.walletGridPanel}
        childrenContainerStyle={styles.noflex}
        title={i18n.t('screens.dashboard.walletPanel.title')}
        titleStyle={styles.panelViewTitle}
      >
        {
          _.isEmpty(wallets)
            ?
              <Text style={styles.body}>{i18n.t('screens.dashboard.walletPanel.empty')}</Text>
            :
              <View>
                <Text style={styles.footnote}>{i18n.t('common.bitnationPat')}</Text>
                <Text style={[styles.largeTitle, styles.textWallet]}>{prettyWalletBalance(patWallet)}</Text>
              </View>
        }
      </PanelView>
    </View>
  );
};

WalletPanel.defaultProps = {
  wallets: [],
};

export default WalletPanel;

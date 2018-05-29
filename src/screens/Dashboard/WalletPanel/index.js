// @flow

import React from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';

import styles from './styles';

import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';
import { prettyWalletBalance } from '../../../utils/formatters';
import type { WalletType } from '../../../types/Wallet';

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
const WalletPanel = ({ style, wallets } : Props) => ((
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
              <Text style={styles.footnote}>XPAT</Text>
              <Text style={styles.currencyLarge}>{prettyWalletBalance(wallets[1])}</Text>
            </View>
      }
    </PanelView>
  </View>
));

WalletPanel.defaultProps = {
  wallets: [],
};

export default WalletPanel;

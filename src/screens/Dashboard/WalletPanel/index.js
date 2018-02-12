import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';
import { prettyETHWalletBalance } from '../../../utils/formatters';
import styles from '../../../global/Styles';

/**
 * @desc Component to render wallet panel on dashboard
 * @type React.Component
 */
export default class WalletPanel extends Component {

  render() {
    const { style } = this.props;
    const hasWallets = !_.isEmpty(this.props.wallets);
    const wallet = hasWallets && this.props.wallets[0];

    return (
      <View style={style}>
        <PanelView
          title={i18n.t('screens.dashboard.walletPanel.title')}
          body={!hasWallets && i18n.t('screens.dashboard.walletPanel.empty')}
        >
          {
            hasWallets &&
            <Text style={styles.body}>
              {wallet.currency}
            </Text>
          }
          {
            hasWallets &&
            <View>
              <Text style={styles.panelTitle}>
                {prettyETHWalletBalance(wallet, '', false)}
              </Text>
            </View>
          }

        </PanelView>
      </View>
    );
  }

}

WalletPanel.propTypes = {
  /**
   * @desc Array of wallet objects.
   */
  wallets: PropTypes.array,
};

WalletPanel.defaultProps = {
  wallets: [],
};

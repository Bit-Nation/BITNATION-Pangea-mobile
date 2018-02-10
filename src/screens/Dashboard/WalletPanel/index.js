import React, { Component } from 'react';
import {
  View, Text
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';
import { prettyETHWalletBalance } from '../../../utils/formatters';

/**
 * @desc Component to render wallet panel on dashboard
 * @type React.Component
 */
export default class WalletPanel extends Component {

  render() {
    const { style } = this.props;

    return (
      <View style={style}>
        <PanelView title={i18n.t('screens.dashboard.walletPanel.title')}>
	        <Text>
	        {_.isEmpty(this.props.wallets) ?
              i18n.t('screens.dashboard.walletPanel.empty')
              :
              prettyETHWalletBalance(this.props.wallets[0])
          }
	        </Text>
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

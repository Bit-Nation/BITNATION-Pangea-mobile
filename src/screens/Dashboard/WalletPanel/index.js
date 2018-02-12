import React, { Component } from 'react'
import {
	View, Text,
} from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'

import styles from './styles'

import PanelView from '../../../components/common/PanelView'
import i18n from '../../../global/i18n'
import { prettyWalletBalance } from '../../../utils/formatters'

/**
 * @desc Component to render wallet panel on dashboard
 * @type React.Component
 */
export default class WalletPanel extends Component {
	
	render () {
		const {style} = this.props
		
		return (
			<View style={style}>
				<PanelView
					style={styles.walletGridPanel}
					childrenContainerStyle={styles.noflex}
					title={i18n.t('screens.dashboard.walletPanel.title')}
					>
						{_.isEmpty(this.props.wallets) ?
							<Text>i18n.t('screens.dashboard.walletPanel.empty')</Text>
							: <View><Text style={styles.footnote}>ETH</Text>
								<Text style={styles.currencyLarge}>{prettyWalletBalance(this.props.wallets[0], ' ')}</Text></View>
						}
				</PanelView>
			</View>
		)
	}
	
}

WalletPanel.propTypes = {
	/**
	 * @desc Array of wallet objects.
	 */
	wallets: PropTypes.array,
}

WalletPanel.defaultProps = {
	wallets: [],
}

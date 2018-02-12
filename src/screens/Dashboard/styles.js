import { MediaQueryStyleSheet } from 'react-native-responsive'
import { Dimensions } from 'react-native'

import Colors from '../../global/colors'
import GlobalStyles from '../../global/Styles'

const {height, width} = Dimensions.get('window')

const styles = {
	...GlobalStyles,
	
	panelViewTitle: {
		...GlobalStyles.panelViewTitle,
		color: Colors.BitnationHighlightColor,
	},
	
	activityPanelContainer: {
		flex: 1,
	},
	activityPanel: {
		flex: 1,
	},
	bottomContainer: {
		flex: 2,
		flexDirection: 'row',
	},
	nationsPanel: {
		flex: 1,
		marginRight: 4,
	},
	rightContainer: {
		marginLeft: 4,
		flex: 1,
		//flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		
	},
	walletPanel: {
		//flex: 2,
	},
	
	warningPanel: {
		flex: 1,
	},
	warningPanelBody: {
		...GlobalStyles.body,
		fontWeight: '300',
		
	},
}
export default styles
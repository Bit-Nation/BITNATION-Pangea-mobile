import { MediaQueryStyleSheet } from 'react-native-responsive'
import { Dimensions } from 'react-native'

import GlobalStyles from '../../../global/Styles'

const styles = MediaQueryStyleSheet.create(
	{
		...GlobalStyles,
		
		walletGridPanel: {
			...GlobalStyles.gridPanelView,
			flex: 0,
			justifyContent: 'flex-start',
		},
	})
export default styles
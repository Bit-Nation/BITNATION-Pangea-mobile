import { MediaQueryStyleSheet } from 'react-native-responsive'
import GlobalStyles from '../../../global/Styles'

const styles = MediaQueryStyleSheet.create({
	...GlobalStyles,
	
	bottomSpacer: {
		width: '100%',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	
})

export default styles

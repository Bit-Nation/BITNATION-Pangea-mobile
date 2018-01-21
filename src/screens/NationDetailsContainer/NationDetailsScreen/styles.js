import { MediaQueryStyleSheet } from 'react-native-responsive'
import Colors from '../../../global/Colors'
import GlobalStyles from '../../../global/Styles'

const styles = MediaQueryStyleSheet.create({
	...GlobalStyles,
	
	title: {
		...GlobalStyles.largeTitle,
	},
	
	scrollView: {
		flex: 1,
	},
	
	messageView: {
		marginBottom: 8,
		marginLeft: 8,
		marginRight: 8,
	},
	
})

export default styles

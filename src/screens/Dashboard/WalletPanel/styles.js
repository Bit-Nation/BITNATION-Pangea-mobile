import { MediaQueryStyleSheet } from 'react-native-responsive'
import { Dimensions } from 'react-native'

import GlobalStyles from '../../../global/Styles'

const styles = MediaQueryStyleSheet.create(
	{
		...GlobalStyles,
		// What is this?
		//list: { height: 44*5 },
	})
export default styles
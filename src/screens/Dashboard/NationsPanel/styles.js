import { MediaQueryStyleSheet } from 'react-native-responsive'
import { Dimensions } from 'react-native'

import GlobalStyles from '../../../global/Styles'
import Colors from '../../../global/colors'

const styles = {
		...GlobalStyles,
		
		/*
		// For lists inside the panels
		childrenContainer: {
			flex: 1,
			marginLeft: -16,
			marginRight: -16,
		},
		*/
		
		// Make the contents align to top
		nationsGridPanel: {
			...GlobalStyles.gridPanelView,
			justifyContent: 'flex-start',
		},
		
		// Shows XXX in Pangea
		nationsCountContainer: {
			marginBottom: 16,
			alignItems: 'flex-end',
		},
		
		// Header item for the list of nations
		nationsListHeader: {
			...GlobalStyles.panelFlatlistHeader,
			/*
			backgroundColor: Colors.shadeOf(Colors.BitnationDarkColor, 0.5),
			paddingLeft: 16,
			height: 30,
			justifyContent: 'center',
			*/
		},
		
		nationsListHeaderText: {
			...GlobalStyles.body,
			//color: Colors.BitnationHighlightColor,
		},
		
		nationsListText: {
			...GlobalStyles.listItemTextVeryBold,
		},
		
		nationsCountString: {
			...GlobalStyles.bodyBlack,
			color: 'white',//Colors.BitnationHighlightColor,
		},
	}
export default styles
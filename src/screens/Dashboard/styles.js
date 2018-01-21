/*eslint-disable*/
import { MediaQueryStyleSheet } from 'react-native-responsive'
import { Dimensions } from 'react-native'
import Colors from '../../global/Colors'
import GlobalStyles from '../../global/Styles'

var {height, width} = Dimensions.get('window')

const styles = MediaQueryStyleSheet.create(
	{
		...GlobalStyles,
		
		containerList: {
			flex: 1,
			flexDirection: 'row',
			//alignItems: 'center',
			
		},
		listName: {
			marginRight: '10%',
			width: '80%',
			justifyContent: 'center',
			
		},
		text: {
			...GlobalStyles.body,
		},
		
		listIcon: {
			
			justifyContent: 'flex-start',
			
		},
		photo2: {
			height: 10,
			width: 10,
			borderRadius: 20,
		},
		line2: {
			backgroundColor: 'black',
			width: '100%',
			marginLeft: '2%',
			height: 1,
			
		},
		separator: {
			width: '100%',
			marginLeft: '3%',
			height: 1,
			backgroundColor: Colors.GraySilver,
		},
		
		container: {
			flexDirection: 'column',
			flex: 1,
			
		},
		backImage: {
			position: 'absolute',
			zIndex: -1,
			
		},
		firstContainer:
			{
				flex: 2,
				flexDirection: 'row',
				marginBottom: '1.6%',
				opacity: 0.6,
			},
		
		//Nation, Wallet
		NWContainer:
			{
				flex: 1,
				flexDirection: 'column',
				marginRight: '1.7%',
				
			},
		NationsContainer: {
			flex: 2,
			backgroundColor: Colors.BitnationColor,
			marginBottom: '5%',
			marginLeft: '5%',
			borderRadius: 8,
			
		},
		
		WalletContainer: {
			flex: 1,
			backgroundColor: Colors.BitnationColor,
			marginBottom: '1%',
			marginLeft: '5%',
			borderRadius: 6,
			
		},
		
		cFlex: {
			
			flex: 1,
		},
		chatTextContainer:
			{
				flex: 1,
			},
		chatsText: {
			color: 'white',
			fontWeight: 'bold',
			textAlign: 'center',
			marginTop: '1%',
		},
		
		listContainer: {
			flex: 3,
		},
		//Activity
		ActivityContainer:
			{
				flex: 1.5,
				flexDirection: 'row',
				backgroundColor: Colors.BitnationColor,
				marginRight: '2%',
				borderRadius: 8,
				
			},
		
		ChatNationContainer: {
			flex: 1,
			flexDirection: 'row',
			opacity: 0.6,
		},
		
		chatContainer: {
			flex: 1.5,
			backgroundColor: Colors.BitnationColor,
			borderRadius: 6,
			marginLeft: '2%',
			marginRight: '2%',
			marginBottom: '2%',
			
		},
		demo: {
			position: 'absolute',
			marginLeft: '20%',
			marginTop: '10%',
			width: 80,
			height: 60,
			zIndex: 10,
			
		},
		demoContracts: {
			position: 'absolute',
			marginLeft: '20%',
			marginTop: '10%',
			width: 100,
			height: 80,
			zIndex: 10,
			
		},
		
		logoW: {
			backgroundColor: 'red',
			width: '100%',
			height: '90%',
			zIndex: 20,
			position: 'absolute',
			
		},
		
		contractsContainer: {
			flex: 1,
			backgroundColor: Colors.BitnationColor,
			borderRadius: 6,
			marginRight: '2%',
			marginBottom: '2%',
			
		},
		
		secondContainer: {
			flex: 1,
			backgroundColor: Colors.BitnationColor,
			borderRadius: 8,
			paddingRight: '4%',
			paddingLeft: '4%',
			paddingTop: '3%',
			flexDirection: 'column',
			opacity: 0.6,
			marginLeft: '2%',
			marginRight: '2%',
		},
		
		secondText: {
			textAlign: 'center',
			fontWeight: 'bold',
			color: 'white',
		},
		demoWorld: {
			position: 'absolute',
			marginLeft: '30%',
			marginTop: '10%',
			width: 100,
			height: 80,
			zIndex: 10,
			
		},
		sImage: {
			
			//backgroundColor: 'black'
			//backgroundColor:'red'
			//position:'absolute'
		},
		secondImageContainer: {
			//backgroundColor: Colors.Transparent,
			marginTop: '5%',
			marginLeft: '5%',
			marginRight: '5%',
			
			// position:'absolute',
			
		},
		
	})
export default styles

/*eslint-disable */
import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	ListView,
	TouchableOpacity,
	ScrollView,
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Images from '../../global/AssetsImages'
import styles from './styles'
import TextBox from '../../components/TextBox'
import ListModal from '../../components/ListModal'
import BackgroundScreen from '../../components/BackgroundScreen/index'
import FakeNavigationBar from '../../components/common/FakeNavigationBar'
import PanelView from '../../components/common/PanelView'

class Dashboard extends Component {
	constructor (props) {
		super(props)
		
		const ds = new ListView.DataSource(
			{rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			dataSource: ds.cloneWithRows([
				{
					name: 'Label',
					avatar_url: Images.rightArrow,
					subtitle: 'Vice President',
				},
				{
					name: 'Label',
					avatar_url: Images.rightArrow,
					subtitle: 'Vice Chairman',
				},
				{
					name: 'Label',
					avatar_url: Images.rightArrow,
					subtitle: 'Vice Chairman',
				},
				{
					name: 'Label',
					avatar_url: Images.rightArrow,
					subtitle: 'Vice Chairman',
				},
				{
					name: 'Label',
					avatar_url: Images.rightArrow,
					subtitle: 'Vice Chairman',
				}, {
					name: 'Label',
					avatar_url: Images.rightArrow,
					subtitle: 'Vice Chairman',
				}, {
					name: 'Label',
					avatar_url: Images.rightArrow,
					subtitle: 'Vice Chairman',
				}, {
					name: 'Label',
					avatar_url: Images.rightArrow,
					subtitle: 'Vice Chairman',
				},
			
			]),
		}
	}
	
	listDemo () {
		return (
			<View style={styles.cFlex}>
				
				<View style={styles.chatTextContainer}>
					<Text style={styles.chatsText}>Chats</Text>
				
				</View>
				<View style={styles.listContainer}>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={(data) =>
							<TouchableOpacity style={styles.containerList}>
								<View style={styles.listName}>
									<Text style={styles.text}>
										{data.name}
									</Text>
								</View>
								<View style={styles.listIcon}>
									<Image source={data.avatar_url}
									       style={styles.photo2}/>
								</View>
							
							</TouchableOpacity>}
						
						// renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
					/>
				</View>
			
			</View>
		)
	}
	
	render () {
		return (
			<View style={styles.screenContainer}>
				<BackgroundScreen/>
				<FakeNavigationBar navBarHidden/>
				<View style={styles.bodyContainer}>
					<ScrollView style={styles.scrollView}>
						
						{this._panel()}
						
						<View style={styles.ChatNationContainer}>
							<View style={styles.chatContainer}>
								
								<Image style={styles.demo}
								       source={Images.demo}
								       resizeMode="contain"
								/>
								{this.listDemo()}
							
							</View>
							<View style={styles.contractsContainer}>
								<Image style={styles.demoContracts}
								       source={Images.demo}
								       resizeMode="contain"
								/>
								<ListModal
									title="Contracts"
									flexNumber={1}
									marginRight={0}
									marginLeft={0}
									marginBottom={0}
									data={this.state.dataSource}/>
							</View>
						
						</View>
						
						<View style={styles.secondContainer}>
							
							
							<Image style={styles.demoWorld}
							       source={Images.demo}
							       resizeMode="contain"
							/>
							
							
							<Text style={styles.secondText}>Around the World
							</Text>
							
							<View style={styles.sImage}>
								<Image
									style={styles.secondImageContainer}
									source={Images.logo}
									resizeMode="contain"
								/>
							</View>
						
						</View>
					</ScrollView>
				
				</View>
			
			</View>
		
		)
	}
	
	/* ------------------------- */
	/* FUNCTIONS */
	/* ------------------------- */
	
	/* ------------------------- */
// Useful Notes:
// PanelView Props: title = text, messageText = text, style, renderBottom = method, renderAdditionalInfo = method, children = main text of the display
// DemoImage overlays a message telling user this is a demonstration
	
	/* ------------------------- */
	
	_panel () {
		return (
			<PanelView style={styles.panelView} title={`Panel Title`} icon={'?'}
			           body={'XXXLorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'}>
{/*
			<Text style={styles.body}>
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
					sed diam nonummy nibh euismod tincidunt ut laoreet dolore
					magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
					quis nostrud exerci tation ullamcorper suscipit lobortis
					nisl ut aliquip ex ea commodo consequat.
				</Text>
*/}
				
				{/*<View style={styles.NWContainer}>
					<ListModal
						title='Nations'
						flexNumber={2}
						marginBottom={3}
						marginLeft={2.5}
						data={this.state.dataSource}/>
				</View>*/}
			</PanelView>
		)
	}
	
}

/* ------------------------- */
/* PROPS */

Dashboard.propTypes = {}

Dashboard.defaultProps = {}

const mapStateToProps = state => ({
	...state,
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

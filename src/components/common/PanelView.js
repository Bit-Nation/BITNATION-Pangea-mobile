/**
 * Generate a panel for a grid of panels.
 * The grid might be a mosaic, or list.
 * @param {Object} props
 - props.title {string} Title of the panel
 - props.body {string} Body text of the panel
 - props.renderAdditionalInfo {function} A function that renders a View
 - props.onButtonClick {function} If set, a button appears that calls onButtonClick(), using styles.button
 - props.buttonTitle {string} Text for the button
 - props.renderBottom {function} A function that renders a View at the bottom of the panel
 - props.children {string} A view to be shown in the body of the panel. A complex panel gets its contents through the children of the <panel> element.
 * @return {Array} the plotted axis components
 */

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { MediaQueryStyleSheet } from 'react-native-responsive'
import PropTypes from 'prop-types'

// Global color definitions
import Colors from '../../global/Colors'
// Global styles
import GlobalStyles from '../../global/Styles'

// What is this?
//import Text from './Text'

import Button from './Button'

export default class PanelView extends Component {
	
	render () {
		
		const {style, renderBottom, renderAdditionalInfo, children} = this.props
		
		return (
			<View style={[styles.panelView, style]}>
				
				{/* TITLE + ICON */}
				{/*
				<View style={styles.panelTitleRowContainer}>
					{
						this.props.title &&
						<View style={styles.panelTitleContainer}>
							<Text style={styles.panelTitle}>
								{this.props.title}
							</Text>
						</View>
					}
					{
						this.props.icon &&
						<View style={styles.panelTitleIconContainer}>
							<Text style={styles.panelIcon}>
								{this.props.icon}
							</Text>
						</View>
					}
				</View>
				*/}
				{/* MAIN DISPLAY AREA */}
				<View style={styles.panelTextContainer}>
					{children}
				</View>
				
				{
					this.props.body &&
					<View style={styles.panelTextContainer}>
						<Text style={styles.body}>
							{this.props.body}
						</Text>
					</View>
				}
				{/*
				<View style={styles.messageAdditionalInfoContainer}>
					{renderAdditionalInfo && renderAdditionalInfo()}
				</View>
				{
					this.props.onButtonClick &&
					<Button style={styles.button}
					        title={this.props.buttonTitle}
					        onPress={this.props.onButtonClick}/>
				}
				<View style={styles.messageBottomContainer}>
					{renderBottom && renderBottom()}
				</View>
				*/}
			</View>
		)
	}
	
}

PanelView.PropTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	renderAdditionalInfo: PropTypes.function,
	onButtonClick: PropTypes.function,
	buttonTitle: PropTypes.string,
	renderBottom: PropTypes.function,
}

// Set styles using the global Styles
const styles = MediaQueryStyleSheet.create({
	...GlobalStyles,
})

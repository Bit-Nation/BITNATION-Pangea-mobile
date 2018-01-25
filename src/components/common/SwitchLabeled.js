import React, { Component } from 'react'
import { Switch, View, Text } from 'react-native'
import { MediaQueryStyleSheet } from 'react-native-responsive'
import PropTypes from 'prop-types'
import GlobalStyles from '../../global/Styles'
import Colors from '../../global/Colors'

export default class SwitchLabeled extends Component {
	
	render () {
		const {onValueChange} = this.props
		
		return (
			<View style={styles.formRow}>
				<View style={styles.switchContainer}>
					<Switch style={styles.switchObject}
					        onTintColor={Colors.BitnationColor}
					        onValueChange={onValueChange}
					        value={this.props.value}
					/>
					<Text style={styles.formSwitchLabelText}>{this.props.label}</Text>
				</View>
			</View>
		)
	}
}

SwitchLabeled.propTypes = {
	value: PropTypes.bool,
	label: PropTypes.string,
}

SwitchLabeled.defaultProps = {
	value: false,
	label: '',
}

const styles = MediaQueryStyleSheet.create({
	...GlobalStyles,
	
})
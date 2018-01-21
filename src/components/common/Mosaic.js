/**
 * Mosaic Component
 * Based on work by Adam Krell - April 28, 2015
 */

import React, { Component } from 'react'
import {
	Image,
	View,
} from 'react-native'


class Mosaic extends Component {
	constructor (props) {
		super(props)
	}
	
	componentWillMount () {
		let uris = []
		let imageUris = this.shuffle(this.props.uris)
		imageUris = imageUris.slice(0, 4)
		
		for (let i = 0; i < imageUris.length; i++) {
			uris[i] = imageUris[i]
		}
		
		this.setState({uris: uris})
	}
	
	shuffle (uris) {
		let currentIndex = uris.length, temporaryValue, randomIndex
		
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1
			temporaryValue = uris[currentIndex]
			uris[currentIndex] = uris[randomIndex]
			uris[randomIndex] = temporaryValue
		}
		
		return uris
	}
	
	createViews () {
		let i, multiplier, width, height, images,
			length = this.state.uris.length
		
		if (this.state.uris.length === 0) {
			return this.createImage(1, this.props.defaultUri, this.props.width,
				this.props.width)
		}
		
		multiplier = [[1, 1], [1, .5], [.5, .5], [.5, .5]]
		
		return this.state.uris.map((uri, index) => {
			width = this.props.width * multiplier[length - 1][0]
			height = this.props.width * multiplier[length - 1][1]
			
			// Logic to enable a set of three images to be able to have one image with different dimensions.
			if (index == 2 && length == 3) {
				width *= 2
			}
			
			return this.createImage(index, uri, width, height)
		})
	}
	
	createImage (index, uri, width, height) {
		return (
			<Image
				key={index}
				source={uri}
				width={width}
				height={height}
			/>
		)
	}
	
	render () {
		let content = this.createViews()
		return (
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'flex-start',
					flexWrap: 'wrap',
					width: this.props.width,
					height: this.props.width,
					marginRight: 10,
				}}>
				{content}
			</View>
		)
	}
}

Mosaic.defaultProps = {
	width: 50,
	uris: [],
	defaultUri: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
}

module.exports = Mosaic

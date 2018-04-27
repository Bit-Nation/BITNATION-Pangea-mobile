// @flow

import React, { Component } from 'react';
import { View, Text, Slider } from 'react-native';

import i18n from '../../../global/i18n';
import SwitchLabeled from '../../../components/common/SwitchLabeled';
import styles from '../styles';

type Props = {
};

class SecuritySettings extends Component<Props> {

	constructor(props: Props) {
		super(props);
		this.state = {
			numericCode: false,
			length: 8
		};
	}

	setFieldValue(field, value) {
		this.setState({[field]: value});
	}

	render() {
		return (
			<View>
				<Text style={styles.headline}>{i18n.t('screens.accounts.create.securityTitle')}</Text>
				<View style={styles.formRow}>
					<View style={styles.fieldsContainer}>
						<SwitchLabeled
							label={i18n.t('screens.accounts.create.numericCode')}
							value={this.state.numericCode}
							align="right"
							onValueChange={value => this.setFieldValue('numericCode', value)}
						/>
					</View>
				</View>
				<View style={styles.formRow}>
						<Text style={styles.body}>{i18n.t('screens.accounts.create.codeLength')}</Text>
		        <Slider
		          step={1}
		          maximumValue={15}
		          onValueChange={value => this.setFieldValue('length', value)}
		          value={this.state.length}
		          style={styles.lengthSlider}
		        />
		        <Text style={styles.body}>{this.state.length}</Text>
				</View>
			</View>
		)
	}
}

export default SecuritySettings;
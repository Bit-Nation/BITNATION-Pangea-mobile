// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
// import DropDown, {
//   Select,
//   Option,
//   OptionList,
// } from 'react-native-selectme';
import ModalDropdown from 'react-native-modal-dropdown';

import i18n from '../../../global/i18n';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import PanelView from '../../../components/common/PanelView';
import ScreenTitle from '../../../components/common/ScreenTitle';
import Button from '../../../components/common/Button';
import SwitchLabeled from '../../../components/common/SwitchLabeled';
import styles from '../styles';

type Props = {
};

class DeveloperSettings extends Component<Props> {

  constructor(props: Props) {
    super(props);

    this.state = {
    	testingAccount: false,
    	network: null,
    	detailedLogging: false,
    	debuggingTools: false,
    }

    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
  }

  previousStep() {
    
  }

  nextStep() {
    
  }

  setFieldValue(field, value) {
		this.setState({[field]: value});
	}

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.create.title')} />
          <View style={styles.bodyContainer}>
            <Text style={styles.headline}>{i18n.t('screens.accounts.create.developerTitle')}</Text>
						<View style={styles.formRow}>
							<View style={styles.fieldsContainer}>
								<SwitchLabeled
									label={i18n.t('screens.accounts.create.testingAccount')}
									value={this.state.testingAccount}
									align="right"
									onValueChange={value => this.setFieldValue('testingAccount', value)}
								/>
							</View>
						</View>
						<View style={styles.formRow}>
							<View style={styles.fieldsContainer}>
								{this.state.testingAccount ?
									<ModalDropdown 
										defaultValue={i18n.t('screens.accounts.create.mainNetwork')}
										style={styles.networkDropdownButton}
										textStyle={styles.body}
										dropdownStyle={styles.networkDropdownList}
										dropdownTextStyle={{}}
										options={[
											i18n.t('screens.accounts.create.ropstenNetwork'),
											i18n.t('screens.accounts.create.rinkebyNetwork')
										]}
									/>
									:
									<Text style={styles.body}>{i18n.t('screens.accounts.create.useMainNetwork')}</Text>
								}
							</View>
						</View>
						<View style={styles.formRow}>
							<View style={styles.fieldsContainer}>
								<SwitchLabeled
									label={i18n.t('screens.accounts.create.detailLogging')}
									value={this.state.detailedLogging}
									align="right"
									onValueChange={value => this.setFieldValue('detailedLogging', value)}
									disabled={!this.state.testingAccount}
								/>
							</View>
						</View>
						<View style={styles.formRow}>
							<View style={styles.fieldsContainer}>
								<SwitchLabeled
									label={i18n.t('screens.accounts.create.debuggingTools')}
									value={this.state.debuggingTools}
									align="right"
									onValueChange={value => this.setFieldValue('debuggingTools', value)}
									disabled={!this.state.testingAccount}
								/>
							</View>
						</View>
          </View>
          <View style={styles.buttonContainerMultiple}>
            <Button
              style={styles.panelButton}
              title={'Prev'}
              onPress={this.previousStep}
            />
            <Button
              style={styles.panelButton}
              title={'Next'}
              onPress={this.nextStep}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperSettings);

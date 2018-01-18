import React from 'react';
import {
  View,
  Text, ScrollView, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import BackgroundImage from '../../../components/common/BackgroundImage';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/Colors';
import { ActionSheet } from 'native-base';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import styles from './styles';
import MessageView from '../../../components/common/MessageView';

const DONE_BUTTON = 'DONE_BUTTON';

class CreateNation extends NavigatorComponent {

  constructor(props) {
    super(props);

    this.actionSheet = null;
    this._setNavigationButtons(false);
  }

  _setNavigationButtons(saveEnabled) {
    this.props.navigator.setButtons(
      {
        leftButtons: [{
          title: 'Cancel',
          id: 'cancel',
          buttonColor: Colors.navigationColor,
        }],
        rightButtons: [{
          title: 'Done',
          id: DONE_BUTTON,
          disabled: !saveEnabled,
          buttonColor: Colors.navigationColor,
        }],
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const saveWasEnabled = this._saveShouldBeEnabled(this.props);
    const saveWillBeEnabled = this._saveShouldBeEnabled(nextProps);
    if (saveWasEnabled !== saveWillBeEnabled) {
      this._setNavigationButtons(saveWillBeEnabled);
    }
  };

  onNavBarButtonPress(id) {
    if (id === 'cancel') {
      this.props.navigator.pop();
    }
    if (id === DONE_BUTTON) {
      this.props.onDoneNationCreation();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        {this._buildHeader()}
        <ScrollView style={styles.scrollView}>
          {this._buildNameView()}
          {this._buildLocationView()}
          {this._buildGovernmentalView()}
          {this._buildOptionsView()}
        </ScrollView>
      </View>
    );
  }

  _buildHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.nameText}>Create a Nation</Text>
        <Text style={styles.infoText}>
          uses the Kanun legal code, and laws are enforced with a Reputation System (using the threat of public
          shaming
          and shunning). The government is a Holocracy. The nation is managed as a non-profit entity
        </Text>
      </View>
    );
  }

  _buildNameView() {
    return (
      <MessageView style={styles.messageView}>
        <TextInput
          style={styles.textInput}
          placeholder='Name'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Name of Founder'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
      </MessageView>
    );
  }

  _buildLocationView() {
    return (
      <MessageView style={styles.messageView}>
        <Text style={styles.infoText}>Location</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Geographical'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Latitide/Longitude'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='City'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Zone'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Country'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <Text style={styles.infoText}>
          Virtual locations are in the Pangea cloud and do not have fixed addresses. Geographic locations are on Earth and have addresses.
        </Text>
      </MessageView>
    );
  }

  _buildGovernmentalView() {
    return (
      <MessageView style={styles.messageView}>
        <Text style={styles.infoText}>Governmental Structure</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Legal Code'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Law Enforcement Mechanisms'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Type of Government'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='For-Profit or Non-Profit'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <Text style={styles.infoText}>
          Here is some text. Here is some text. Here is some text. Here is some text. Here is some text. Here is some text. Here is some text. Here is some text.
        </Text>
      </MessageView>
    );
  }

  _buildOptionsView() {
    return (
      <MessageView style={styles.messageView}>
        <Text style={styles.infoText}>Options</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Legal Code'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Law Enforcement Mechanisms'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Type of Government'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <TextInput
          style={styles.textInput}
          placeholder='For-Profit or Non-Profit'
          placeholderTextColor='rgba(255,255,255,0.3)'
          keyboardType='default'
        />
        <Text style={styles.infoText}>
          Here is some text. Here is some text. Here is some text. Here is some text. Here is some text. Here is some text. Here is some text. Here is some text.
        </Text>
      </MessageView>
    );
  }
}

CreateNation.propTypes = {
  onCancelNationCreation: PropTypes.func.isRequired,
  onDoneNationCreation: PropTypes.func.isRequired,
};

export default CreateNation;
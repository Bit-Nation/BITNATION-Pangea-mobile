import React from 'react';
import {
  Image,
  View,
  Text, TouchableOpacity, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import AssetsImage from '../../../global/AssetsImages';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/Colors';

const DONE_BUTTON = 'DONE_BUTTON';

class EditProfile extends NavigatorComponent {

  constructor(props) {
    super(props);

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
      this.props.onCancelEditing();
    }
    if (id === DONE_BUTTON) {
      this.props.onDoneEditing();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <View style={styles.fakeNavigationBar}/>
        {this._buildHeader()}
      </View>
    );
  }

  _buildHeader() {
    const { editingUser } = this.props;

    const avatarSource = editingUser.avatar ?
      { uri: `data:image/gif;base64,${editingUser.avatar}` } :
      AssetsImage.logo;

    return (
      <View style={[styles.row, styles.header]}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={this._onEditAvatar}>
            <View style={styles.avatarChangeContainer}>
              <Image source={avatarSource} style={styles.avatar}/>
              <Text style={styles.editText}>edit</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldsContainer}>

          <View style={styles.row}>
            <TextInput
              value={this.props.editingUser.name}
              onChangeText={(text) => this._onChange('name', text)}
              style={styles.textInput}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              value={this.props.editingUser.location}
              onChangeText={(text) => this._onChange('location', text)}
              style={styles.textInput}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.labelText}>Lat.</Text>
            <TextInput
              value={this.props.editingUser.latitude.toString()}
              onChangeText={(text) => this._onChange('latitude', text)}
              style={styles.textInput}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.labelText}>Long.</Text>
            <TextInput
              value={this.props.editingUser.longitude.toString()}
              onChangeText={(text) => this._onChange('longitude', text)}
              style={styles.textInput}
            />
          </View>

        </View>
      </View>
    );
  }

  _onChange = (field, value) => {
    this.props.onUserChanged(field, value);
  };

  _onEditAvatar = () => {

  };

  _userIsValid(user) {
    return !_.isEmpty(user.name) && !_.isEmpty(user.location);
  }

  _saveShouldBeEnabled(props) {
    return !_.isEqual(props.user, props.editingUser) && this._userIsValid(props.editingUser);
  }

}

EditProfile.propTypes = {
  user: PropTypes.object,
  editingUser: PropTypes.object,
  onUserChanged: PropTypes.func.isRequired,
  onCancelEditing: PropTypes.func.isRequired,
  onDoneEditing: PropTypes.func.isRequired,
};

export default EditProfile;

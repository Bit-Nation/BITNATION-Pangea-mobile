import React from 'react';
import {
  Image,
  View,
  Text, TouchableOpacity, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import AssetsImage from '../../../global/AssetsImages';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/Colors';
import { ActionSheet } from 'native-base';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';

const DONE_BUTTON = 'DONE_BUTTON';

class EditProfile extends NavigatorComponent {

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
        <FakeNavigationBar/>
        {this._buildHeader()}
      </View>
    );
  }

  _buildHeader() {
    const { editingUser } = this.props;

    const avatarSource = editingUser.avatar ?
      { uri: `data:image/gif;base64,${editingUser.avatar}` } :
      AssetsImage.Placeholder.avatar;

    return (
      <View style={[styles.formRow, styles.header]}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={this._onEditAvatar}>
            <View style={styles.avatarChangeContainer}>
              <Image source={avatarSource} style={styles.avatar}/>
              <Text style={styles.editItemLabel}>edit</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldsContainer}>

          <View style={styles.formRow}>
            <TextInput
              value={this.props.editingUser.name}
              onChangeText={(text) => this._onChange('name', text)}
              style={styles.textInput}
              placeholder='Name'
              placeholderTextColor='rgba(255,255,255,0.3)'
              keyboardType='default'
            />
          </View>

          <View style={styles.formRow}>
            <TextInput
              value={this.props.editingUser.location}
              onChangeText={(text) => this._onChange('location', text)}
              style={styles.textInput}
              placeholder='Location (Optional)'
              placeholderTextColor='rgba(255,255,255,0.3)'
              keyboardType='default'
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.labelText}>Lat.</Text>
            <TextInput
              value={this.props.editingUser.latitude}
              onChangeText={(text) => this._onChange('latitude', text)}
              style={styles.textInput}
              keyboardType='numeric'
              placeholderTextColor='rgba(255,255,255,0.3)'
              placeholder = "(Optional)"
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.labelText}>Long.</Text>
            <TextInput
              value={this.props.editingUser.longitude}
              onChangeText={(text) => this._onChange('longitude', text)}
              style={styles.textInput}
              keyboardType='numeric'
              placeholderTextColor='rgba(255,255,255,0.3)'
              placeholder = "(Optional)"
            />
          </View>


        </View>
        <ActionSheet ref={(c) => {
          this.actionSheet = c;
        }}/>
      </View>
    );
  }

  _onChange = (field, value) => {
    this.props.onUserChanged(field, value);
  };

  _onEditAvatar = () => {
    const PHOTO_LIBRARY = 0;
    const CAMERA = 1;

    if (this.actionSheet !== null) {
      this.actionSheet._root.showActionSheet(
        {
          options: ['Photo Library', 'Take Photo', 'Cancel'],
          cancelButtonIndex: 2,
          title: 'Edit your profile picture.'
        },
        buttonIndex => {
          switch (buttonIndex) {
            case PHOTO_LIBRARY:
              this._openPicker(false);
              break;
            case CAMERA:
              this._openPicker(true);
              break;
          }
        }
      );
    }
  };

  _openPicker = async (isCamera) => {
    const options = {
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      compressImageQuality: 0.4,
      includeBase64: true,
    };

    try {
      const result = isCamera ?
        await ImagePicker.openCamera(options)
        :
        await ImagePicker.openPicker(options);

      if (result.data) {
        this.props.onUserChanged('avatar', result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  _userIsValid(user) {
    return !_.isEmpty(user.name); {/* Commented for Sprint 0.3.1 requiriments && !_.isEmpty(user.location); */}
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

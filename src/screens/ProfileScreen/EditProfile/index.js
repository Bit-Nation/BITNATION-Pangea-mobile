import React from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import AssetsImage from '../../../global/AssetsImages';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/colors';
import { ActionSheet } from 'native-base';
import PanelView from '../../../components/common/PanelView';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../../global/i18n';

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
          title: i18n.t('screens.profile.edit.cancelButton'),
          id: 'cancel',
          buttonColor: Colors.navigationButtonColor,
        }],
        rightButtons: [{
          title: i18n.t('screens.profile.edit.doneButton'),
          id: DONE_BUTTON,
          disabled: !saveEnabled,
          buttonColor: Colors.navigationButtonColor,
        }],
      },
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

  // ========================================
  // MAIN SCREEN
  render() {
    return (
      <View style={styles.bodyContainer}>
        {/* SCROLLING PANELS FOR DATA ENTRY */}
        <KeyboardAwareScrollView style={styles.scrollView}>
          {/* TITLE OF SCREEN */}
          <View style={styles.titleContainer}>
            <View style={styles.titleBarLarge}>
              <Text style={styles.largeTitle}>{i18n.t('screens.profile.edit.editPhoto')}</Text>
            </View>
          </View>

          {this._buildPicturePanel()}
          {this._buildProfileForm()}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  // ========================================
  _buildPicturePanel() {
    const { editingUser } = this.props;

    const avatarSource = editingUser.avatar
      ? { uri: `data:image/gif;base64,${editingUser.avatar}` }
      : AssetsImage.Placeholder.avatar;

    return (
      <View style={styles.avatarContainerLarge}>
        <TouchableOpacity onPress={this._onEditAvatar}>
          <View style={styles.avatarChangeContainer}>
            <Image source={avatarSource}
                   style={styles.avatarLarge}/>
            <Text
              style={styles.editItemLabel}>{i18n.t('screens.profile.edit.editPhoto')}</Text>
          </View>
        </TouchableOpacity>
      </View>

    );
  }


  // ========================================
  _buildProfileForm() {
    // When more panels appear, we will use
    // i18n.t('screens.profile.edit.personalInformation')
    const panelTitle = '';

    return (
      <PanelView
        style={styles.panelViewTransparent}
        title={panelTitle}
      >
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <View style={styles.formRow}>
              <TextInput
                value={this.props.editingUser.name}
                onChangeText={(text) => this._onChange(
                  'name',
                  text)}
                style={styles.textInput}
                placeholder={i18n.t('screens.profile.edit.name')}
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
              />
            </View>
            <View style={styles.formRow}>
              <TextInput
                value={this.props.editingUser.location}
                onChangeText={(text) => this._onChange(
                  'location',
                  text)}
                style={styles.textInput}
                placeholder={i18n.t('screens.profile.edit.location')}
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
              />
            </View>
          </View>
          <
            ActionSheet
            ref={(c) => {
              this.actionSheet = c;
            }
            }
          />

        </View>
      </PanelView>
    );
  }

  /*
    _buildHeader() {
      const { editingUser } = this.props;

      const avatarSource = editingUser.avatar ?
        { uri: `data:image/gif;base64,${editingUser.avatar}` } :
        AssetsImage.Placeholder.avatar;

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
                placeholder='Name'
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
              />
            </View>

            <View style={styles.row}>
              <TextInput
                value={this.props.editingUser.location}
                onChangeText={(text) => this._onChange('location', text)}
                style={styles.textInput}
                placeholder='Location (Optional)'
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
              />
            </View>
          </View>
          <ActionSheet ref={(c) => {
            this.actionSheet = c;
          }}/>
        </View>
      );
    }
  */

  _onChange = (field, value) => {
    this.props.onUserChanged(field, value);
  };

  _onEditAvatar = () => {
    const PHOTO_LIBRARY = 0;
    const CAMERA = 1;

    if (this.actionSheet !== null) {
      this.actionSheet._root.showActionSheet(
        {
          options: [
            i18n.t('screens.profile.edit.editPhotoActionSheet.photoLibrary'),
            i18n.t('screens.profile.edit.editPhotoActionSheet.takePhoto'),
            i18n.t('screens.profile.edit.editPhotoActionSheet.cancel'),
          ],
          cancelButtonIndex: 2,
          title: i18n.t('screens.profile.edit.editPhotoActionSheet.title'),
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
        },
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
    return !_.isEmpty(user.name);
    {/* Commented for Sprint 0.3.1 requiriments && !_.isEmpty(user.location); */
    }
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

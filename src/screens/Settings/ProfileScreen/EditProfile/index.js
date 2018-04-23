// @flow

import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActionSheet } from 'native-base';

import NavigatorComponent from '../../../../components/common/NavigatorComponent';
import PanelView from '../../../../components/common/PanelView';
import saveShouldBeEnabled from '../../../../utils/profile';
import AssetsImage from '../../../../global/AssetsImages';
import Colors from '../../../../global/colors';
import type { Navigator } from '../../../../types/ReactNativeNavigation';
import type { Account, EditingAccount } from '../../../../types/Account';
import i18n from '../../../../global/i18n';
import styles from './styles';
import ScreenTitle from '../../../../components/common/ScreenTitle';

const DONE_BUTTON = 'DONE_BUTTON';

export type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Account object that is currently being edited
   */
  editingAccount: Account,
  /**
   * @desc Current account object
   */
  account: Account,
  /**
   * @desc Function to modify the editing account
   * @param field An account field to be modified
   * @param value Updated value on the UI
   */
  onAccountChanged: (field: string, value: string) => void,
  /**
   * @desc Function to cancel account edit
   */
  onCancelEditing: () => void,
  /**
   * @desc Function to complete account edit
   */
  onDoneEditing: () => void,
};

class EditProfile extends NavigatorComponent<Props> {
  actionSheet: any;

  constructor(props: Props) {
    super(props);

    this.actionSheet = null;
    this.setNavigationButtons(false);
  }

  setNavigationButtons(saveEnabled: boolean): void {
    this.props.navigator.setButtons({
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
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    const saveWasEnabled = saveShouldBeEnabled(this.props.account, this.props.editingAccount);
    const saveWillBeEnabled = saveShouldBeEnabled(nextProps.account, nextProps.editingAccount);
    if (saveWasEnabled !== saveWillBeEnabled) {
      this.setNavigationButtons(saveWillBeEnabled);
    }
  }

  onNavBarButtonPress(id: string): void {
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
          <ScreenTitle title={i18n.t('screens.profile.edit.editPhoto')} />
          {this._buildPicturePanel()}
          {this._buildProfileForm()}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  // ========================================
  _buildPicturePanel() {
    const { editingAccount } = this.props;

    const avatarSource = editingAccount.avatar
      ? { uri: `data:image/gif;base64,${editingAccount.avatar}` }
      : AssetsImage.Placeholder.avatar;

    return (
      <View style={styles.avatarContainerLarge}>
        <TouchableOpacity onPress={this._onEditAvatar}>
          <View style={styles.avatarChangeContainer}>
            <Image source={avatarSource} style={styles.avatarLarge} />
            <Text style={styles.editItemLabel}>
              {i18n.t('screens.profile.edit.editPhoto')}
            </Text>
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
                value={this.props.editingAccount.name}
                onChangeText={text => this._onChange('name', text)}
                style={styles.textInput}
                placeholder={i18n.t('screens.profile.edit.name')}
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
              />
            </View>
            <View style={styles.formRow}>
              <TextInput
                value={this.props.editingAccount.location}
                onChangeText={text => this._onChange('location', text)}
                style={styles.textInput}
                placeholder={i18n.t('screens.profile.edit.location')}
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
              />
            </View>
          </View>
          <ActionSheet
            ref={(c) => {
              this.actionSheet = c;
            }}
          />

        </View>
      </PanelView>
    );
  }

  _onChange = (field, value) => {
    this.props.onAccountChanged(field, value);
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
        (buttonIndex) => {
          switch (buttonIndex) {
            case PHOTO_LIBRARY:
              this._openPicker(false);
              break;
            case CAMERA:
              this._openPicker(true);
              break;
            default:
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
        this.props.onAccountChanged('avatar', result.data);
      }
    } catch (error) {
      Alert.alert(i18n.t('error.noCamera'));
    }
  };
}

export default EditProfile;

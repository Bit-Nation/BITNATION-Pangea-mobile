// @flow

import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import NavigatorComponent from '../../../NavigatorComponent';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import { imageSource, saveShouldBeEnabled } from '@pangea/profile/profile-utils';
import AssetsImage from 'pangea-common-reactnative/assets/AssetsImages';
import Colors from 'pangea-common-reactnative/styles/colors';
import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import type { Account, PartialAccount } from 'pangea-common/types/accounts-types';
import i18n from 'pangea-common/i18n';
import styles from './styles';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';
import { androidNavigationButtons } from 'pangea-common-reactnative/Screens';
import PhotoActionSheet from 'pangea-common-reactnative/UI/PhotoActionSheet';

const DONE_BUTTON = 'DONE_BUTTON';

export type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Account object that is currently being edited
   */
  editingAccount: Account | PartialAccount,
  /**
   * @desc Current account object
   */
  account: Account | PartialAccount,
  /**
   * @desc If account is currently being created.
   */
  isCreating: boolean,
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
  photoActionSheet: any;

  constructor(props: Props) {
    super(props);

    this.photoActionSheet = null;
    this.setNavigationButtons(saveShouldBeEnabled(this.props.account, this.props.editingAccount));
  }

  setNavigationButtons(saveEnabled: boolean): void {
    const buttons = {
      leftButtons: undefined,
      rightButtons: [{
        title: i18n.t('screens.profile.edit.doneButton'),
        id: DONE_BUTTON,
        disabled: !saveEnabled,
        buttonColor: Colors.BitnationLinkOrangeColor,
      }],
      ...androidNavigationButtons,
    };
    if (this.props.isCreating === false) {
      buttons.leftButtons = [{
        title: i18n.t('screens.profile.edit.cancelButton'),
        id: 'cancel',
        buttonColor: Colors.BitnationLinkOrangeColor,
      }];
    }
    this.props.navigator.setButtons(buttons);
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
          {this._buildPicturePanel()}
          {this._buildProfileForm()}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  // ========================================
  _buildPicturePanel() {
    const { editingAccount } = this.props;

    const avatarSource = imageSource(editingAccount.avatar) || AssetsImage.avatarIcon;

    return (
      <View style={styles.avatarContainerLarge}>
        <TouchableOpacity onPress={this.onEditAvatar}>
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
                onChangeText={text => this.onChange('name', text)}
                style={styles.textInput}
                placeholder={i18n.t('screens.profile.edit.name')}
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
              />
            </View>
            <View style={styles.formRow}>
              <TextInput
                value={this.props.editingAccount.location}
                onChangeText={text => this.onChange('location', text)}
                style={styles.textInput}
                placeholder={i18n.t('screens.profile.edit.location')}
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
              />
            </View>
          </View>
          <PhotoActionSheet
            ref={actionSheet => (this.photoActionSheet = actionSheet)}
            onImageChosen={this.onNewAvatarChosen}
            circleCropping
            title={i18n.t('screens.profile.edit.editPhotoActionSheet.title')}
          />
        </View>
      </PanelView>
    );
  }

  onNewAvatarChosen = (data: string) => {
    this.props.onAccountChanged('avatar', data);
  };

  onChange = (field: string, value: any) => {
    this.props.onAccountChanged(field, value);
  };

  onEditAvatar = () => {
    if (this.photoActionSheet != null) {
      this.photoActionSheet.show();
    }
  };
}

export default EditProfile;

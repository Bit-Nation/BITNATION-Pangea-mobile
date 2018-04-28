// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheet } from 'native-base';

import i18n from '../../../global/i18n';
import { screen } from '../../../global/Screens';
import AssetsImage from '../../../global/AssetsImages';
import Colors from '../../../global/colors';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import PanelView from '../../../components/common/PanelView';
import ScreenTitle from '../../../components/common/ScreenTitle';
import Button from '../../../components/common/Button';
import styles from '../styles';
import type { Navigator } from '../../../types/ReactNativeNavigation';

type Props = {
	/**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

type State = {
  /**
   * @desc Profile avatar string in base64 format
   */
  avatar: string,
  /**
   * @desc Profile name information
   */
  name: string,
  /**
   * @desc Profile location information
   */
  location: string
};

class Identity extends Component<Props, State> {
  nextStep: Function;
  setFieldValue: Function;
  previousStep: Function;
  actionSheet: any;

  constructor(props: Props) {
    super(props);

    this.state = {
    	avatar: '',
    	name: '',
    	location: '',
    };

    this.previousStep = this.previousStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
  }

  previousStep(): void {
    this.props.navigator.pop();
  }

  nextStep(): void {
    this.props.navigator.push(screen('ACCOUNT_CREATE_READY'));
  }

  setFieldValue(field: string, value: string): void {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <View style={styles.profilesScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.accounts.create.title')} />
          <View style={styles.bodyContainer}>
            <Text style={styles.headline}>{i18n.t('screens.accounts.create.identityTitle')}</Text>
            {this._buildPicturePanel()}
            {this._buildProfileForm()}
          </View>
          <View style={styles.buttonContainerMultiple}>
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.create.prev')}
              onPress={this.previousStep}
            />
            <Button
              style={styles.panelButton}
              title={i18n.t('screens.accounts.create.next')}
              onPress={this.nextStep}
            />
          </View>
        </View>
      </View>
    );
  }


  // ========================================
  _buildPicturePanel() {
    const avatarSource = this.state.avatar
      ? { uri: `data:image/gif;base64,${this.state.avatar}` }
      : AssetsImage.Placeholder.avatar;

    return (
      <View style={styles.avatarContainerLarge}>
        <TouchableOpacity onPress={this._onEditAvatar}>
          <View style={styles.avatarChangeContainer}>
            <Image source={avatarSource} style={styles.avatarLarge} />
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
        <View style={styles.bodyContainer}>
          <TextInput
            value={this.state.name}
            onChangeText={text => this.setFieldValue('name', text)}
            style={styles.textInput}
            placeholder={i18n.t('screens.accounts.create.name')}
            placeholderTextColor={Colors.placeholderTextColor}
            keyboardType='default'
          />
          <TextInput
            value={this.state.location}
            onChangeText={text => this.setFieldValue('location', text)}
            style={styles.textInput}
            placeholder={i18n.t('screens.accounts.create.location')}
            placeholderTextColor={Colors.placeholderTextColor}
            keyboardType='default'
          />
        </View>
        <ActionSheet
          ref={(c) => {
            this.actionSheet = c;
          }}
        />
      </PanelView>
    );
  }

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
        this.setFieldValue('avatar', result.data);
      }
    } catch (error) {
      Alert.alert(i18n.t('error.noCamera'));
    }
  };
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Identity);

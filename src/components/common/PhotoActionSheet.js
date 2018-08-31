// @flow

import * as React from 'react';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import { Alert } from 'react-native';

import i18n from '../../global/i18n';

type Props = {
  /**
   * @desc Callback on image chosen.
   * @param {string} base64 Base64 encoded image.
   * @param {string} mimeType Mime type of chosen image.
   */
  onImageChosen: (base64: string, mimeType: string) => void,
};

/**
 * @desc Component that renders action sheet to take or select photo from library.
 * @type {React.Component}
 */
export default class PhotoActionSheet extends React.Component<Props> {
  static defaultProps: Object;

  onSelectPhotoOption = (index: number) => {
    const PHOTO_LIBRARY = 0;
    const CAMERA = 1;

    switch (index) {
      case PHOTO_LIBRARY:
        this.openPicker(false);
        break;
      case CAMERA:
        this.openPicker(true);
        break;
      default:
        break;
    }
  };

  openPicker = async (isCamera: boolean) => {
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
        this.props.onImageChosen(result.data, result.mimeType);
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(i18n.t('error.noCamera'));
      }
    }
  };

  show() {
    if (this.actionSheet != null) {
      this.actionSheet.show();
    }
  }

  actionSheet: any;

  render() {
    const options = [
      i18n.t('screens.profile.edit.editPhotoActionSheet.photoLibrary'),
      i18n.t('screens.profile.edit.editPhotoActionSheet.takePhoto'),
      i18n.t('screens.profile.edit.editPhotoActionSheet.cancel'),
    ];

    return (
      <ActionSheet
        ref={(c) => {
          this.actionSheet = c;
        }}
        title={i18n.t('screens.profile.edit.editPhotoActionSheet.title')}
        options={options}
        cancelButtonIndex={options.length - 1}
        onPress={this.onSelectPhotoOption}
      />
    );
  }
}

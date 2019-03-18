// @flow

import React from "react";
import { connect } from "react-redux";
import { View, FlatList, Text } from "react-native";
import { Fab } from "native-base";

import LucyButton from "pangea-common-reactnative/UI/LucyButton";
import PopOverModal from "../../components/PopOverModal";

import type { Navigator } from "pangea-common-reactnative/ReactNativeNavigation-types";
import NavigatorComponent from "../../NavigatorComponent";
import BackgroundImage from "pangea-common-reactnative/UI/BackgroundImage";
import { androidNavigationButtons, screen } from "pangea-common-reactnative/Screens";
import styles from "./styles";
import FakeNavigationBar from "pangea-common-reactnative/UI/FakeNavigationBar";
import ScreenTitle from "pangea-common-reactnative/UI/ScreenTitle";
import i18n from "pangea-common/i18n";
import ImagePicker from 'react-native-image-crop-picker';
import { Alert } from 'react-native';
import { 
  openDocument, 
  startDocumentCreation, 
  updateModifiedDocumentField 
} from "@pangea/documents/documents-actions";
import Loading from "pangea-common-reactnative/UI/Loading";
import type { State as DocumentsState } from "@pangea/documents/documents-reducers";
import DocumentListItem from "pangea-common-reactnative/UI/DocumentListItem";
import { getDocument } from "@pangea/documents/documents-reducers";
import PhotoActionSheet from "pangea-common-reactnative/UI/PhotoActionSheet";

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Flag that croping image picker
   */
  circleCropping: boolean
};

type Actions = {
  /**
   * @desc Function to open a document
   * @param id Index of the document to open
   */
  openDocument: (id: number) => void,
  /**
   * @desc Function to initiate document creation.
   * @param {string} data Base64 content of file to create.
   */
  startDocumentCreation: (data: string) => void,
  /**
   * @desc Function to change field of modified document.
   * @param field Name of the field to be changed.
   * @param value New value of the field.
   */
  changeDocumentField: (field: string, value: any) => void
};

type State = {
  /**
   * @desc Name of the modal to be shown
   */
   showModal: string
};

const LUCY_MODAL_KEY = "lucyModal";

class DocumentsListScreen extends NavigatorComponent<
  Props & DocumentsState & Actions,
  State
> {
  static navigatorButtons = { ...androidNavigationButtons };
  photoActionSheet: any;

  constructor(props) {
    super(props);

    this.state = {
      showModal: ""
    };
  }

  dismissModal = () => {
    this.setState({
      showModal: ""
    });
  };

  /**
   * @desc Function to run image picker.
   * @param {boolean} isCamera Flag if source is camera.
   * @return {void}
   */
  openPicker = async (isCamera: boolean) => {
    const options = {
      cropping: this.props.circleCropping,
      mediaType: 'photo',
      cropperCircleOverlay: this.props.circleCropping,
      compressImageQuality: 0.4,
      includeBase64: true,
    };

    try {
      const result = isCamera ?
        await ImagePicker.openCamera(options)
        :
        await ImagePicker.openPicker(options);

      if (result.data) {
        this.onNewDocumentContentChosen(result.data, result.mime);
      }
    } catch (error) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert(i18n.t('error.noCamera'));
      }
    }
  };

  onSelectItem = id => {
    this.props.openDocument(id);
    const document = getDocument(this.props, id);
    if (document == null) return;

    this.props.navigator.showModal({
      ...screen("DOCUMENT_VIEW_SCREEN"),
      title: document.name,
      passProps: {
        accountId: id,
        onCancel: () => this.props.navigator.dismissModal()
      }
    });
  };

  onStartNewDocumentContent = () => {
    if (this.photoActionSheet == null) return;
    this.photoActionSheet.show();
  };

  onNewDocumentContentChosen = (data: string, mimeType: string) => {
    this.props.startDocumentCreation(data);
    this.props.changeDocumentField("mimeType", mimeType);
    this.props.navigator.showModal({
      ...screen("DOCUMENT_MODIFY_SCREEN"),
      passProps: {
        onCancel: () => this.props.navigator.dismissModal()
      }
    });
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <FlatList
            renderItem={item => {
              const document = item.item;
              // @todo Add preview icon.
              return (
                <DocumentListItem
                  name={document.name}
                  onPress={id => this.onSelectItem(id)}
                  id={document.id}
                  description={document.description}
                />
              );
            }}
            keyExtractor={item => `${item.id}`}
            data={this.props.documents}
            style={styles.sectionList}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          />
        </View>
        {/* <Fab
          style={styles.floatingButton}
          position='bottomRight'
          onPress={this.onStartNewDocumentContent}
        >
          <Text>+</Text>
        </Fab>
        <PhotoActionSheet
          ref={actionSheet => (this.photoActionSheet = actionSheet)}
          onImageChosen={this.onNewDocumentContentChosen}
          title={i18n.t("screens.documentsList.actionSheetTitle")}
        /> */}
        {this.props.isFetching && <Loading />}
        <LucyButton
          onPress={() => this.setState({ showModal: LUCY_MODAL_KEY })}
        />
        <PopOverModal
          visible={this.state.showModal === LUCY_MODAL_KEY}
          onCancel={this.dismissModal}
          desText={i18n.t("screens.documentsList.actionSheetTitle")}
          options={[
            {
              text: i18n.t('screens.profile.edit.editPhotoActionSheet.photoLibrary'),
              onPress: () => {
                this.openPicker(false);
                //this.dismissModal();
              }
            },
            {
              text: i18n.t('screens.profile.edit.editPhotoActionSheet.takePhoto'),
              onPress: () => {
                this.openPicker(true);
                //this.dismissModal();
              }
            },
            {
              text: i18n.t('screens.profile.edit.editPhotoActionSheet.cancel'),
              onPress: () => {
                this.dismissModal();
              }
            }
          ]}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.documents
});

const mapDispatchToProps = dispatch => ({
  openDocument(id) {
    dispatch(openDocument(id));
  },
  startDocumentCreation(data) {
    dispatch(startDocumentCreation(data));
  },
  changeDocumentField(field, value) {
    dispatch(updateModifiedDocumentField(field, value));
  }
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(DocumentsListScreen);

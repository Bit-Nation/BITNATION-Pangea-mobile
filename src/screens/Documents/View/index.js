// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView } from 'react-native';

import type { Navigator } from '../../../types/ReactNativeNavigation';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import { screen } from '../../../global/Screens';
import styles from './styles';
import i18n from '../../../global/i18n';
import {
  startDocumentEditing,
  deleteDocument,
  uploadDocument,
} from '../../../actions/documents';
import type { State as DocumentsState } from '../../../reducers/documents';
import Button from '../../../components/common/Button';
import Colors from '../../../global/colors';
import AssetsImages from '../../../global/AssetsImages';
import { imageSource } from '../../../utils/profile';
import { getOpenedDocument } from '../../../reducers/documents';
import DocumentListItem from '../../../components/common/DocumentListItem';
import MoreMenuModal from '../../../components/common/MoreMenuModal';
import { contentStorage } from '../../../services/documents';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

type Actions = {
  /**
   * @desc Function to initiate document creation.
   * @param id Id of document to edit.
   */
  startDocumentEditing: (id: number) => void,
  /**
   * @desc Function to initiate document deleting.
   * @param id Id of document to delete.
   */
  deleteDocument: (id: number) => void,
  /**
   * @desc Function to initiate document upload.
   * @param id Id of document to delete.
   */
  uploadDocument: (id: number) => void,
};

const MORE_MENU_BUTTON = 'MORE_MENU_BUTTON';

class DocumentsViewScreen extends NavigatorComponent<
  Props & DocumentsState & Actions,
  *,
> {
  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'cancel',
          icon: AssetsImages.closeIcon,
          title: i18n.t('common.cancel'),
          buttonColor: Colors.navigationButtonColor,
        },
      ],
      rightButtons: [
        {
          id: MORE_MENU_BUTTON,
          icon: AssetsImages.moreMenuIcon,
          buttonColor: Colors.navigationButtonColor,
        },
      ],
    });

    this.state = {
      moreMenuVisible: false,
    };

    const openedDocument = getOpenedDocument(this.props);
    if (openedDocument != null) {
      this.content = contentStorage.resolveContent(openedDocument.dataId);
    }
  }

  content: string = '';

  onNavBarButtonPress(id: string) {
    switch (id) {
      case MORE_MENU_BUTTON:
        this.setState({ moreMenuVisible: true });
        break;
      case 'cancel':
        this.props.navigator.dismissModal();
        break;
      default:
        break;
    }
  }

  onSelectEdit = () => {
    const { openedDocumentId } = this.props;
    if (openedDocumentId == null) return;
    const document = getOpenedDocument(this.props);
    if (document == null) return;

    this.props.startDocumentEditing(openedDocumentId);
    this.props.navigator.showModal({
      ...screen('DOCUMENT_MODIFY_SCREEN'),
      title: document.name,
    });
  };

  onSelectDelete = () => {
    const { openedDocumentId } = this.props;
    if (openedDocumentId == null) return;

    this.props.deleteDocument(openedDocumentId);
    this.setState({ moreMenuVisible: false }, () => {
      setTimeout(() => {
        this.props.navigator.dismissModal();
      }, 1000);
    });
  };

  onDocumentSubmit = () => {
    const { openedDocumentId } = this.props;
    if (openedDocumentId == null) return;

    this.props.uploadDocument(openedDocumentId);
  };

  displayDocumentValues = (value) => {
    console.log(value);
  }

  render() {
    const documentDetail = ['Registered', 'TxHash', 'Signature', 'Document Hash'];
    const document = getOpenedDocument(this.props);
    if (document == null) return <View />;

    return (
      <View style={styles.screenContainer}>
        <View style={styles.previewContainer}>
          <Image
            source={imageSource(this.content, document.mimeType)}
            style={styles.preview}
            resizeMode='contain'
          />
        </View>
        <View style={styles.metadataContainer}>
          <ScrollView>
            <Text style={styles.headline}>{document.name}</Text>
            <Text style={styles.footnote}>{document.description}</Text>
            <Button
              enabled
              style={styles.actionButton}
              title={i18n.t('screens.documentView.submitdocument').toUpperCase()}
              onPress={this.onDocumentSubmit}
              styleTitle={styles.settingsText}
            />
            <DocumentListItem
              id={1}
              name='Status'
              value='Value'
              disclosureIconVisible={false}
              onPress={() => console.log('hello')}
            />
            {documentDetail.map((index, id) => (
              <DocumentListItem
                id={id}
                name={index}
                value='Value'
                disclosureIconVisible={false}
                onPress={() => this.displayDocumentValues(index)}
              />
              ))}
          </ScrollView>
        </View>
        <MoreMenuModal
          visible={this.state.moreMenuVisible === true}
          onCancel={() => this.setState({ moreMenuVisible: false })}
          options={[
            {
              text: i18n.t('screens.documentView.actions.edit'),
              onPress: this.onSelectEdit,
            },
            {
              text: i18n.t('screens.documentView.actions.delete'),
              onPress: this.onSelectDelete,
            },
          ]}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.documents,
});

const mapDispatchToProps = dispatch => ({
  startDocumentEditing(documentId) {
    dispatch(startDocumentEditing(documentId));
  },
  deleteDocument(documentId) {
    dispatch(deleteDocument(documentId));
  },
  uploadDocument(documentId) {
    dispatch(uploadDocument(documentId));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentsViewScreen);

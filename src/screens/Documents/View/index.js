// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
} from 'react-native';

import type { Navigator } from '../../../types/ReactNativeNavigation';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import { screen } from '../../../global/Screens';
import styles from './styles';
import i18n from '../../../global/i18n';
import { startDocumentEditing, deleteDocument } from '../../../actions/documents';
import type { State as DocumentsState } from '../../../reducers/documents';
import Colors from '../../../global/colors';
import AssetsImages from '../../../global/AssetsImages';
import { imageSource } from '../../../utils/profile';
import { getOpenedDocument } from '../../../reducers/documents';
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
}

const MORE_MENU_BUTTON = 'MORE_MENU_BUTTON';

class DocumentsViewScreen extends NavigatorComponent<Props & DocumentsState & Actions, *> {
  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [{
        id: 'cancel',
        icon: AssetsImages.closeIcon,
        title: i18n.t('common.cancel'),
        buttonColor: Colors.navigationButtonColor,
      }],
      rightButtons: [{
        id: MORE_MENU_BUTTON,
        icon: AssetsImages.moreMenuIcon,
        buttonColor: Colors.navigationButtonColor,
      }],
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

  dismissModal = () => {
    this.setState({ moreMenuVisible: false });
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
      passProps: {
        onWillClose: this.dismissModal,
      },
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

  render() {
    const document = getOpenedDocument(this.props);
    if (document == null) return (<View />);

    return (
      <View style={styles.screenContainer}>
        <View style={styles.previewContainer}>
          <Image source={imageSource(this.content, document.mimeType)} style={styles.preview} resizeMode='contain' />
        </View>
        <View style={styles.metadataContainer}>
          <Text style={styles.headline}>
            {document.name}
          </Text>
          <Text style={styles.footnote}>
            {document.description}
          </Text>
        </View>
        <MoreMenuModal
          visible={this.state.moreMenuVisible === true}
          onCancel={this.dismissModal}
          options={[{
            text: i18n.t('screens.documentView.actions.edit'),
            onPress: this.onSelectEdit,
          }, {
            text: i18n.t('screens.documentView.actions.delete'),
            onPress: this.onSelectDelete,
          }]
          }
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsViewScreen);

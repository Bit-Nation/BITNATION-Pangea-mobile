// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView, Clipboard, TouchableHighlight, WebView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import NavigatorComponent from '../../NavigatorComponent';
import { screen } from 'pangea-common-reactnative/Screens';
import styles from './styles';
import i18n from 'pangea-common/i18n';
import {
  startDocumentEditing,
  deleteDocument,
  uploadDocument,
} from '@pangea/documents/documents-actions';
import type { State as DocumentsState } from '@pangea/documents/documents-reducers';
import type { Account } from 'pangea-common/types/accounts-types';
import Button from 'pangea-common-reactnative/UI/Button';
import Colors from 'pangea-common-reactnative/styles/colors';
import AssetsImages from 'pangea-common-reactnative/assets/AssetsImages';
import { imageSource } from '@pangea/profile/profile-utils';
import { getOpenedDocument } from '@pangea/documents/documents-reducers';
import DocumentDetail from 'pangea-common-reactnative/UI/DocumentDetail';
import { getCurrentAccount } from '@pangea/accounts/accounts-reducers';
import MoreMenuModal from 'pangea-common-reactnative/UI/MoreMenuModal';
import { contentStorage } from '@pangea/documents/documents-service';
import { alert } from 'pangea-common/alerts';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Current user object.
   */
  user: Account | null,
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
      text: '',
      txHash: '',
      loading: false,
      visibleTxModal: false,
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
    alert('confirmDelete', [
      {
        name: 'yes',
        onPress: () => this.confirmDelete(),
      }, {
        name: 'no',
        onPress: () => this.cancelDelete(),
      }]);
  }

  cancelDelete = () => {
    this.setState({ moreMenuVisible: false });
  }

  confirmDelete = () => {
    const { openedDocumentId } = this.props;
    if (openedDocumentId == null) return;
    this.props.deleteDocument(openedDocumentId);
    this.setState({ moreMenuVisible: false }, () => {
      setTimeout(() => {
        this.props.navigator.dismissModal();
      }, 1000);
    });
  }

  onDocumentSubmit = () => {
    const { openedDocumentId } = this.props;
    if (openedDocumentId == null) return;
    this.setState({ loading: true });
    this.props.uploadDocument(openedDocumentId);
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  displayDocumentValues = (result) => {
    if (result == null) return;
    const { value: valueToShor } = result;
    if (valueToShor == null) return;

    switch (result.name) {
      case i18n.t('screens.documentView.txHash'):
        Alert.alert(
          'Transaction Hash', `${valueToShor}`,
          [
            {
              text: 'COPY',
              onPress: () => this.writeToClipboard(valueToShor),
            },
            {
              text: 'ETHERSCAN',
              onPress: () => this.setState({ visibleTxModal: true, txHash: valueToShor }),
            },
          ],
        );
        break;
      case i18n.t('screens.documentView.signature'):
        Alert.alert(
          'Signature', `${valueToShor}`,
          [
            {
              text: 'SHARE',
              // onPress: () => this.props.navigator.dismissModal(),
            },
            {
              text: 'COPY',
              onPress: () => this.writeToClipboard(valueToShor),
            },
          ],
        );
        break;
      case i18n.t('screens.documentView.docHash'):
        Alert.alert(
          'Document Hash', `${valueToShor}`,
          [
            {
              text: 'SHARE',
              //  onPress: () => this.props.navigator.dismissModal(),
            },
            {
              text: 'COPY',
              onPress: () => this.writeToClipboard(valueToShor),
            },
          ],
        );
        break;
      default:
        break;
    }
  };

  writeToClipboard = async (value) => {
    this.setState({ text: value });
    await Clipboard.setString(this.state.text);
  };

  txModalClose() {
    this.setState({ visibleTxModal: false });
  }

  etherScanURL(hash) {
    const { user } = this.props;
    if (user && user.networkType === 'main') {
      return `https://etherscan.io/address/${hash}`;
    }
    return `https://rinkeby.etherscan.io/address/${hash}`;
  }

  render() {
    const document = getOpenedDocument(this.props);
    const { openedDocumentId } = this.props;
    const { loading } = this.state;
    if (document == null) return <View />;
    const documentDetail = [
      {
        name: i18n.t('screens.documentView.registered'),
        value: document.registered,
      },
      {
        name: i18n.t('screens.documentView.txHash'),
        value: document.txHash,
      },
      {
        name: i18n.t('screens.documentView.signature'),
        value: document.signature,
      },
      {
        name: i18n.t('screens.documentView.docHash'),
        value: document.docHash,
      },
    ];

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
            {document.txHash == null && (
              <Button
                enabled={!loading}
                style={styles.actionButton}
                title={i18n
                  .t('screens.documentView.submitDocument')
                  .toUpperCase()}
                onPress={this.onDocumentSubmit}
                loading={loading}
                styleTitle={styles.settingsText}
              />
            )}
            {document.txHash != null && (
              <DocumentDetail
                id={1}
                name={i18n.t('screens.documentView.status')}
                documentListValue={document.tx_hash === '' ? 'Pending' : 'Submitted'}
                disclosureIconVisible={false}
                onPress={() => console.log('hello')}
              />
            )}
            {document.txHash != null &&
            document.docHash != null &&
            document.signature != null &&
            openedDocumentId === document.id &&
            documentDetail.map((index, id) => (
              index.value != null &&
              <DocumentDetail
                id={id}
                name={index.name}
                documentListValue={index.value}
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
        <Modal isVisible={this.state.visibleTxModal}>
          <View>
            <TouchableHighlight
              onPress={() => {
                this.txModalClose();
              }}
            >
              <Image source={AssetsImages.closeIcon} />
            </TouchableHighlight>
          </View>
          {this.state.txhash &&
            <WebView
              source={{
                      uri: this.etherScanURL(this.state.txHash),
                    }}
            />
            }
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.documents,
  user: getCurrentAccount(state.accounts),
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

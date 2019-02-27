// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  Text,
} from 'react-native';
import { Fab } from 'native-base';

import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import NavigatorComponent from '../../NavigatorComponent';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import { androidNavigationButtons, screen } from 'pangea-common-reactnative/Screens';
import styles from './styles';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';
import i18n from 'pangea-common/i18n';
import { openDocument, startDocumentCreation, updateModifiedDocumentField } from '@pangea/documents/documents-actions';
import Loading from 'pangea-common-reactnative/UI/Loading';
import type { State as DocumentsState } from '@pangea/documents/documents-reducers';
import DocumentListItem from 'pangea-common-reactnative/UI/DocumentListItem';
import { getDocument } from '@pangea/documents/documents-reducers';
import PhotoActionSheet from 'pangea-common-reactnative/UI/PhotoActionSheet';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
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
  changeDocumentField: (field: string, value: any) => void,
}

class DocumentsListScreen extends NavigatorComponent<Props & DocumentsState & Actions> {
  static navigatorButtons = { ...androidNavigationButtons };
  photoActionSheet: any;

  onSelectItem = (id) => {
    this.props.openDocument(id);
    const document = getDocument(this.props, id);
    if (document == null) return;

    this.props.navigator.showModal({
      ...screen('DOCUMENT_VIEW_SCREEN'),
      title: document.name,
      passProps: {
        accountId: id,
        onCancel: () => this.props.navigator.dismissModal(),
      },
    });
  };

  onStartNewDocumentContent = () => {
    if (this.photoActionSheet == null) return;
    this.photoActionSheet.show();
  };

  onNewDocumentContentChosen = (data: string, mimeType: string) => {
    this.props.startDocumentCreation(data);
    this.props.changeDocumentField('mimeType', mimeType);
    this.props.navigator.showModal({
      ...screen('DOCUMENT_MODIFY_SCREEN'),
      passProps: {
        onCancel: () => this.props.navigator.dismissModal(),
      },
    });
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.bodyContainer}>
          <ScreenTitle title={i18n.t('screens.documentsList.title')} />
          <FlatList
            renderItem={(item) => {
              const document = item.item;
              // @todo Add preview icon.
              return (<DocumentListItem
                name={document.name}
                onPress={id => this.onSelectItem(id)}
                id={document.id}
                description={document.description}
              />);
            }}
            keyExtractor={item => `${item.id}`}
            data={this.props.documents}
            style={styles.sectionList}
            ItemSeparatorComponent={() => (<View style={styles.itemSeparator} />)}
          />
        </View>
        <Fab
          style={styles.floatingButton}
          position='bottomRight'
          onPress={this.onStartNewDocumentContent}
        >
          <Text>+</Text>
        </Fab>
        <PhotoActionSheet
          ref={actionSheet => (this.photoActionSheet = actionSheet)}
          onImageChosen={this.onNewDocumentContentChosen}
          title={i18n.t('screens.documentsList.actionSheetTitle')}
        />
        {this.props.isFetching && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.documents,
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
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsListScreen);

// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  Text,
} from 'react-native';
import { Fab } from 'native-base';

import type { Navigator } from '../../../types/ReactNativeNavigation';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import BackgroundImage from '../../../components/common/BackgroundImage';
import { screen } from '../../../global/Screens';
import styles from './styles';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import ScreenTitle from '../../../components/common/ScreenTitle';
import i18n from '../../../global/i18n';
import { openDocument, startDocumentCreation, updateModifiedDocumentField } from '../../../actions/documents';
import Loading from '../../../components/common/Loading';
import type { State as DocumentsState } from '../../../reducers/documents';
import DocumentListItem from '../../../components/common/DocumentListItem';
import { getDocument } from '../../../reducers/documents';
import PhotoActionSheet from '../../../components/common/PhotoActionSheet';

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
  photoActionSheet: any;

  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [],
      rightButtons: [],
    });
  }

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

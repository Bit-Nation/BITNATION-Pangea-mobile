// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
} from 'react-native';

import type { Navigator } from '../../../types/ReactNativeNavigation';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import BackgroundImage from '../../../components/common/BackgroundImage';
import { screen } from '../../../global/Screens';
import styles from './styles';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import ScreenTitle from '../../../components/common/ScreenTitle';
import ListItem from '../../../components/common/ListItem';
import type { Document } from '../../../types/Documents';
import i18n from '../../../global/i18n';
import { openDocument, startDocumentCreation } from '../../../actions/documents';
import Loading from '../../../components/common/Loading';
import type { State as DocumentsState } from '../../../reducers/documents';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Array of accounts to be displayed.
   */
  documents: Array<Document>,
};

type Actions = {
  /**
   * @desc Function to open a document
   * @param id Index of the document to open
   */
  openDocument: (id: string) => void,
  /**
   * @desc Function to initiate document creation.
   */
  startDocumentCreation: () => void,
}

class DocumentsListScreen extends NavigatorComponent<Props & DocumentsState & Actions> {
  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [],
      rightButtons: [],
    });
  }

  onSelectItem = (id) => {
    this.props.openDocument(id);
    this.props.navigator.showModal({
      ...screen('ENTER_PASSCODE_SCREEN'),
      passProps: {
        accountId: id,
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
              return (<ListItem
                text={document.name}
                onPress={id => this.onSelectItem(id)}
                id={document.id}
                subtitle={document.description}
              />);
            }}
            keyExtractor={item => item.id}
            data={this.props.documents}
            style={styles.sectionList}
            ItemSeparatorComponent={() => (<View style={styles.itemSeparator} />)}
          />
        </View>
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
  startDocumentCreation() {
    dispatch(startDocumentCreation());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsListScreen);

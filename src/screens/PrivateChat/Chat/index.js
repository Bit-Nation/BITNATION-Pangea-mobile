// @flow

import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  GiftedChat,
  Composer,
  InputToolbar,
  Bubble,
  Actions,
} from 'react-native-gifted-chat';
import ActionSheet from 'react-native-actionsheet';

import styles from './styles';
import { showSpinner, hideSpinner, sendMessage, saveHumanMessage } from '../../../actions/chat';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import { getCurrentAccount } from '../../../reducers/accounts';
import { getSelectedSession } from '../../../utils/chat';
import type { ChatSessionType } from '../../../types/Chat';
import { errorAlert } from '../../../global/alerts';
import i18n from '../../../global/i18n';
import type { DAppType } from '../../../services/database/schema/v4';

type Props = {
  /**
   * @desc React Native Navigation navigator object
   */
  navigator: Navigator,
  /**
   * @desc Current user object
   */
  user: any,
  /**
   * @desc Opponent user object
   */
  opponent: any,
  /**
   * @desc Flag that indicates the loading status
   */
  isFetching: boolean,
  /**
   * @desc Shared secret for the chat session
   */
  secret: string,
  /**
   * @desc Public key of the current user
   */
  userPublicKey: string,
  /**
   * @desc Function to show spinner
   */
  showSpinner: () => void,
  /**
   * @desc Function to hide spinner
   */
  hideSpinner: () => void,
  /**
   * @desc Function to send a human message
   * @param {string} msg Message to be sent
   * @param {func} callback Callback
   * @param {Object} session Session object
   */
  sendMessage: (msg: string, session: Object, callback: () => void) => void,
  /**
   * @desc Function to save a human message
   * @param {string} msg Message to be sent
   * @param {Object} session Session object
   */
  saveMessage: (msg: string, session: Object) => void,
  /**
   * @desc Array of chat sessions.
   */
  sessions: Array<ChatSessionType>,
  /**
   * @desc Array of available DApps.
   */
  availableDApps: Array<DAppType>
};

class ChatScreen extends Component<Props> {
  onSend(messages: Array<any> = []) {
    const message = messages[0].text;
    const session = getSelectedSession(this.props.sessions, this.props.secret);
    if (session == null) {
      this.showSessionClosedAlert();
      return;
    }
    this.props.sendMessage(message, session, (response) => {
      console.log('created human message: ', response);
      if (response) {
        this.props.saveMessage(response, session);
      }
    });
  }

  onSelectDAppToOpen = (index) => {
    // @todo Open DApps
    switch (index) {
      case 0:
        break;
      default:
        break;
    }
  };

  actionSheet: any;

  showSessionClosedAlert = () => {
    errorAlert(new Error('Session is closed, please reopen the chat'));
  };

  render() {
    const dAppsOptions = [
      ...this.props.availableDApps.map(dApp => dApp.name),
      i18n.t('screens.chat.cancel'),
    ];

    const session = getSelectedSession(this.props.sessions, this.props.secret);
    if (session == null) {
      this.showSessionClosedAlert();
      return <View />;
    }
    let sortedMessages = [];
    if (session.decryptedMessages && session.decryptedMessages.length > 0) {
      sortedMessages = session.decryptedMessages.slice().reverse();
    }
    const sendingUser = {
      _id: this.props.userPublicKey,
      name: this.props.user ? this.props.user.name : 'anonymous',
    };
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <FakeNavigationBar />

        <GiftedChat
          messages={sortedMessages}
          onSend={messages => this.onSend(messages)}
          user={sendingUser}
          bottomOffset={Platform.OS === 'ios' ? 48.5 : 0}
          renderComposer={props => (
            <Composer {...props} textInputStyle={styles.composer} />
          )}
          renderInputToolbar={props => (
            <InputToolbar {...props} containerStyle={styles.inputToolbar} />
          )}
          renderBubble={props => (
            <Bubble
              {...props}
              customTextStyle={styles.customTextStyle}
              wrapperStyle={{ left: styles.leftBubbleWrapper, right: styles.rightBubbleWrapper }}
              textStyle={{ left: styles.leftTextStyle, right: styles.rightTextStyle }}
            />
          )}
          onPressActionButton={() => this.actionSheet && this.actionSheet.show()}
          renderActions={props => <Actions {...props} containerStyle={{ width: 26, height: 26 }} />}
        />
        {this.props.isFetching && <Loading />}
        <ActionSheet
          ref={(o) => {
            this.actionSheet = o;
          }}
          options={dAppsOptions}
          cancelButtonIndex={dAppsOptions.length - 1}
          onPress={this.onSelectDAppToOpen}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: getCurrentAccount(state.accounts),
  isFetching: state.chat.isFetching,
  sessions: state.chat.chats,
  availableDApps: state.dApps.availableDApps,
});

const mapDispatchToProps = dispatch => ({
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
  sendMessage: (msg, session, callback) => dispatch(sendMessage(msg, session, callback)),
  saveMessage: (message, session) => dispatch(saveHumanMessage(message, session)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

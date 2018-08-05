/* eslint-disable prefer-destructuring */
// @flow

import React, { Component } from 'react';
import { View, Platform, Clipboard } from 'react-native';
import { connect } from 'react-redux';
import {
  GiftedChat,
  Composer,
  InputToolbar,
  Bubble,
  Actions,
  MessageText,
} from 'react-native-gifted-chat';
import ActionSheet from 'react-native-actionsheet';

import styles from './styles';
import { showSpinner, hideSpinner, sendMessage } from '../../../actions/chat';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import { getCurrentAccount } from '../../../reducers/accounts';
import { getSelectedSession } from '../../../utils/chat';
import type { ChatSessionType, ProfileType } from '../../../types/Chat';
import { errorAlert } from '../../../global/alerts';
import type { Account } from '../../../types/Account';
import type { WalletType } from '../../../types/Wallet';

type Props = {
  /**
   * @desc React Native Navigation navigator object
   */
  navigator: Navigator,
  /**
   * @desc Current user object
   */
  user: Account,
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
   * @param {Object} session Session object
   */
  sendMessage: (msg: string, session: Object) => void,
  /**
   * @desc Array of chat sessions.
   */
  sessions: Array<ChatSessionType>,
  /**
   * @desc Profile of chat friend.
   */
  friend: ProfileType,
  /**
   * @desc Open DApp.
   */
  openDApp: (dAppPublicKey: string, secret: string, friend: ProfileType) => void,
  /**
   * @desc Array of user wallets.
   */
  wallets: Array<WalletType>
};

class ChatScreen extends Component<Props, *> {
  constructor(props) {
    super(props);

    this.state = {
      selectedMessage: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedMessage } = this.state;
    if (selectedMessage === prevState.selectedMessage) return;
    if (selectedMessage == null) return;

    this.messageActionSheet.show();
  }

  onSend(messages: Array<any> = []) {
    const message = messages[0].text;
    const session = getSelectedSession(this.props.sessions, this.props.secret);
    if (session == null) {
      this.showSessionClosedAlert();
      return;
    }
    this.props.sendMessage(message, session);
  }

  onMessageAction = (index: number) => {
    const { selectedMessage } = this.state;
    if (selectedMessage == null) return;

    switch (index) {
      case 0:
        Clipboard.setString(selectedMessage.text);
        break;
      default:
        break;
    }
  };
  dAppsActionSheet: any;
  messageActionSheet: any;

  showSessionClosedAlert = () => {
    errorAlert(new Error('Session is closed, please reopen the chat'));
  };

  render() {
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
          renderMessageText={(props) => {
            const { currentMessage } = props;
            if (currentMessage.dAppMessage == null) {
              return <MessageText {...props} />;
            }

            return null;
          }}
          renderBubble={props => (
            <Bubble
              {...props}
              customTextStyle={styles.customTextStyle}
              wrapperStyle={{ left: styles.leftBubbleWrapper, right: styles.rightBubbleWrapper }}
              textStyle={{ left: styles.leftTextStyle, right: styles.rightTextStyle }}
            />
          )}
          onLongPress={(context, message) => {
            if (message.dAppMessage != null) {
              return;
            }

            this.setState({
              selectedMessage: message,
            });
          }}
          onPressActionButton={() => this.dAppsActionSheet && this.dAppsActionSheet.show()}
          renderActions={props => <Actions {...props} containerStyle={styles.actionContainerStyle} />}
        />
        {this.props.isFetching && <Loading />}
        <ActionSheet
          ref={(o) => {
            this.messageActionSheet = o;
          }}
          options={['Copy Text', 'Cancel']}
          cancelButtonIndex={1}
          onPress={this.onMessageAction}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: getCurrentAccount(state.accounts),
  isFetching: state.chat.isFetching,
  sessions: state.chat.chats,
  friend: state.chat.chatProfile,
  wallets: state.wallet.wallets,
});

const mapDispatchToProps = dispatch => ({
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
  sendMessage: (msg, session) => dispatch(sendMessage(msg, session)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

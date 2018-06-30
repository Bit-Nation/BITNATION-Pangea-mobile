// TODO Add Flow
/* eslint-disable */

import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import config from 'react-native-config';
import {
  GiftedChat,
  Composer,
  InputToolbar,
  Bubble,
} from 'react-native-gifted-chat';
import styles from './styles';

import { showSpinner, hideSpinner, sendMessage, saveHumanMessage } from '../../../actions/chat';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import type { ChatSessionType } from '../../../types/Chat';
import { getCurrentAccount } from '../../../reducers/accounts';
import { getSelectedSession } from '../../../utils/chat';

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
};

type State = {
  /**
   * @desc List of messages
   */
  messages: Array<any>
};

class ChatScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const session = getSelectedSession(this.props.sessions, this.props.secret);
    this.state = {
      session
    };
  }

  onSend(messages: Array<any> = []) {
    const message = messages[0].text;
    this.props.sendMessage(message, this.state.session, (response) => {
      console.log('created human message: ', response);
      if (response) {
        this.props.saveMessage(response);
      }
    });
  }

  render() {
    const session = getSelectedSession(this.props.sessions, this.props.secret);
    const sortedMessages = session.decryptedMessages.slice().reverse();
    const sendingUser = {
      _id: this.props.userPublicKey,
      name: this.props.user ? this.props.user.name : 'anonymous',
    };
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <FakeNavigationBar navBarHidden />

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
              wrapperStyle={{left: styles.leftBubbleWrapper, right: styles.rightBubbleWrapper}}
              textStyle={{left: styles.leftTextStyle, right: styles.rightTextStyle}}
            />
          )}
        />
        {this.props.isFetching && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: getCurrentAccount(state.accounts),
  isFetching: state.chat.isFetching,
  chatProfile: state.chat.chatProfile,
  sessions: state.chat.chats,
});

const mapDispatchToProps = dispatch => ({
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
  sendMessage: (msg, session, callback) => dispatch(sendMessage(msg, session, callback)),
  saveMessage: (message, session) => dispatch(saveHumanMessage(message, session)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

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
import type { ChatSessionType } from '../../../types/Chat';
import { errorAlert } from '../../../global/alerts';
import i18n from '../../../global/i18n';
import type { DAppType } from '../../../dapps';
import { openDApp } from '../../../actions/dApps';
import type { Account } from '../../../types/Account';
import { getDApp } from '../../../reducers/nativeDApps';
import type { State as DAppsState } from '../../../reducers/nativeDApps';

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
   * @desc Array of available DApps.
   */
  availableDApps: Array<DAppType>,
  /**
   * @desc The whole DApps reducer state.
   */
  dAppsState: DAppsState,
  /**
   * @desc Open DApp.
   */
  openDApp: (dAppPublicKey: string, secret: string) => void,
};

class ChatScreen extends Component<Props> {
  onSend(messages: Array<any> = []) {
    const message = messages[0].text;
    const session = getSelectedSession(this.props.sessions, this.props.secret);
    if (session == null) {
      this.showSessionClosedAlert();
      return;
    }
    this.props.sendMessage(message, session);
  }

  onSelectDAppToOpen = (index) => {
    const session = getSelectedSession(this.props.sessions, this.props.secret);
    if (index < this.props.availableDApps.length && session) {
      this.props.openDApp(this.props.availableDApps[index].identityPublicKey, this.props.secret);
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
          renderMessageText={(props) => {
            const { currentMessage } = props;
            if (currentMessage.dAppMessage == null) {
              return <MessageText {...props} />;
            }

            return null;
          }}
          renderCustomView={(props) => {
            const { currentMessage } = props;
            const { dAppMessage } = currentMessage;
            if (dAppMessage == null) return null;

            const dApp = getDApp(this.props.dAppsState, dAppMessage.dapp_id);
            if (dApp == null) return null;
            const MessageComponent = dApp.message;

            return (<MessageComponent dAppMessage={dAppMessage} currentAccount={this.props.user} />);
          }}
          renderBubble={props => (
            <Bubble
              {...props}
              customTextStyle={styles.customTextStyle}
              wrapperStyle={{ left: styles.leftBubbleWrapper, right: styles.rightBubbleWrapper }}
              textStyle={{ left: styles.leftTextStyle, right: styles.rightTextStyle }}
            />
          )}
          onPressActionButton={() => this.actionSheet && this.actionSheet.show()}
          renderActions={props => <Actions {...props} containerStyle={styles.actionContainerStyle} />}
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
  dAppsState: state.dApps,
});

const mapDispatchToProps = dispatch => ({
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
  sendMessage: (msg, session) => dispatch(sendMessage(msg, session)),
  openDApp: (dAppPublicKey, secret) => dispatch(openDApp(dAppPublicKey, {
    chatSecret: secret,
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

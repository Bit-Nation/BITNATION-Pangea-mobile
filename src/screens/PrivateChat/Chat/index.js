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
import { showSpinner, hideSpinner, sendMessage, loadChatMessages, changeUnreadStatus } from '../../../actions/chat';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import { getCurrentAccount } from '../../../reducers/accounts';
import { getSelectedSession } from '../../../utils/chat';
import type { GiftedChatMessageType, ChatSessionType, ProfileType } from '../../../types/Chat';
import type { DAppChatContext, DApp } from '../../../types/DApp';
import { errorAlert } from '../../../global/alerts';
import type { Account } from '../../../types/Account';
import type { WalletType } from '../../../types/Wallet';
import type { State as DAppsState } from '../../../reducers/dApps';
import { getDApp } from '../../../reducers/dApps';
import { openDApp, setDAppContext } from '../../../actions/dApps';
import i18n from '../../../global/i18n';
import DAppMessage from '../../../components/common/DAppMessage';

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
   * @desc The public key of the chat recipient
   */
  recipientPublicKey: string,
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
   * @param {string} recipientPublicKey The recipient's public key
   * @param {string} msg Message to be sent
   * @param {Object} session Session object
   */
  sendMessage: (recipientPublicKey: string, msg: string) => void,
  /**
   * @desc Function to initate messages loading.
   */
  loadMessages: (recipientPublicKey: string, startId?: string) => void,
  /**
   * @desc Array of chat sessions.
   */
  sessions: Array<ChatSessionType>,
  /**
   * @desc Array of available DApps.
   */
  availableDApps: Array<DApp>,
  /**
   * @desc The whole DApps reducer state.
   */
  dAppsState: DAppsState,
  /**
   * @desc Profile of chat partner.
   */
  partner: ProfileType,
  /**
   * @desc Open DApp.
   */
  openDApp: (dAppPublicKey: string) => void,
  /**
   * @desc Set context for DApps.
   */
  setDAppContext: (context: DAppChatContext | null) => void,
  /**
   * @desc Array of user wallets.
   */
  wallets: Array<WalletType>,
  /**
   * @desc Function to mark all messages as read.
   */
  markMessagesAsRead: (recipientPublicKey: string) => void,
};

class ChatScreen extends Component<Props, *> {
  constructor(props) {
    super(props);

    this.state = {
      selectedMessage: null,
    };
  }

  componentDidMount() {
    this.props.setDAppContext(this.buildContext());
    setImmediate(() => {
      this.props.loadMessages(this.props.recipientPublicKey);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const session = getSelectedSession(this.props.sessions, this.props.recipientPublicKey);
    if (session !== null && session.unreadMessages === true) {
      this.props.markMessagesAsRead(this.props.recipientPublicKey);
    }

    const { selectedMessage } = this.state;
    if (selectedMessage === prevState.selectedMessage) return;
    if (selectedMessage == null) return;

    this.messageActionSheet.show();
  }

  componentWillUnmount() {
    this.props.setDAppContext(null);
  }

  onSend(messages: Array<any> = []) {
    const message = messages[0].text;
    const session = getSelectedSession(this.props.sessions, this.props.recipientPublicKey);
    if (session == null) {
      this.showSessionClosedAlert();
      return;
    }
    this.props.sendMessage(this.props.recipientPublicKey, message);
  }

  onSelectDAppToOpen = (index) => {
    if (index < this.props.availableDApps.length) {
      this.props.openDApp(this.props.availableDApps[index].publicKey);
    }
  };

  onMessageAction = (index: number) => {
    const { selectedMessage } = this.state;
    if (selectedMessage == null) return;

    switch (index) {
      case 0: {
        const textToCopy = (selectedMessage.dAppMessage && selectedMessage.dAppMessage.params.contentToCopy) || selectedMessage.text;
        Clipboard.setString(textToCopy);
        break;
      }
      default:
        break;
    }
  };

  buildContext() {
    const context: DAppChatContext = {
      partner: {
        name: this.props.partner.name,
        identityKey: this.props.partner.identityKey,
        ethereumAddress: this.props.partner.ethereumAddress,
      },
      account: {
        name: this.props.user.name,
        identityKey: this.props.userPublicKey,
        ethereumAddress: this.props.wallets[0].ethAddress,
      },
    };

    return context;
  }

  dAppsActionSheet: any;
  messageActionSheet: any;

  showSessionClosedAlert = () => {
    errorAlert(new Error('Session is closed, please reopen the chat'));
  };

  render() {
    const dAppsOptions = [
      ...this.props.availableDApps.map(dApp => dApp.name),
      i18n.t('screens.chat.cancel'),
    ];

    const session = getSelectedSession(this.props.sessions, this.props.recipientPublicKey);
    // if (session == null) {
    //   return <View />;
    // }
    let messages: Array<GiftedChatMessageType> = session != null ? session.messages : [];
    messages = messages
      .map((message) => {
        if (message.dAppMessage == null) return message;
        const { dAppMessage } = message;

        const dApp = getDApp(this.props.dAppsState, dAppMessage.dAppPublicKey);
        if (dApp == null) {
          return {
            ...message,
            user: {
              _id: dAppMessage.dAppPublicKey,
              name: '??',
            },
          };
        }

        return {
          ...message,
          user: {
            _id: dApp.publicKey,
            name: dApp.name,
          },
        };
      });

    const sendingUser = {
      _id: this.props.userPublicKey,
      name: this.props.user ? this.props.user.name : 'anonymous',
    };
    const earliestMessageId = (messages[0] && messages[0]._id) || '0';

    return (
      <View style={styles.container}>
        <BackgroundImage />
        <FakeNavigationBar navBarHidden={false} />

        <GiftedChat
          messages={messages.reverse()}
          onSend={messagesToSend => this.onSend(messagesToSend)}
          user={sendingUser}
          bottomOffset={Platform.OS === 'ios' ? 48.5 : 0}
          renderComposer={props => (
            <Composer {...props} textInputStyle={styles.composer} />
          )}
          renderInputToolbar={props => (
            <InputToolbar {...props} containerStyle={styles.inputToolbar} />
          )}
          renderCustomView={(props) => {
            const { currentMessage }: { currentMessage: GiftedChatMessageType } = props;
            const { dAppMessage } = currentMessage;
            if (dAppMessage == null) return null;

            return (<DAppMessage message={dAppMessage} />);
          }}
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
            this.setState({
              selectedMessage: message,
            });
          }}
          onPressActionButton={() => this.dAppsActionSheet && this.dAppsActionSheet.show()}
          renderActions={props => <Actions {...props} containerStyle={styles.actionContainerStyle} />}
          loadEarlier
          onLoadEarlier={() => this.props.loadMessages(this.props.recipientPublicKey, earliestMessageId)}
        />
        {this.props.isFetching && <Loading />}
        <ActionSheet
          ref={(o) => {
            this.dAppsActionSheet = o;
          }}
          options={dAppsOptions}
          cancelButtonIndex={dAppsOptions.length - 1}
          onPress={this.onSelectDAppToOpen}
        />
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
  partner: state.chat.chatProfile,
  wallets: state.wallet.wallets,
  availableDApps: state.dApps.availableDApps,
  dAppsState: state.dApps,
});

const mapDispatchToProps = dispatch => ({
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
  sendMessage: (publicKey, msg) => dispatch(sendMessage(publicKey, msg)),
  openDApp: dAppPublicKey => dispatch(openDApp(dAppPublicKey)),
  setDAppContext: context => dispatch(setDAppContext(context)),
  loadMessages: (publicKey, fromMessageId) => dispatch(loadChatMessages(publicKey, fromMessageId)),
  markMessagesAsRead: publicKey => dispatch(changeUnreadStatus(publicKey, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

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
  Actions as ChatActions,
  MessageText,
} from 'react-native-gifted-chat';
import ActionSheet from 'react-native-actionsheet';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import { getCurrentAccount } from '../../../reducers/accounts';
import { sendMessage, loadChatMessages, changeUnreadStatus } from '../../../actions/chat';
import { getChatById } from '../../../reducers/chat';
import type { ChatType, GiftedChatMessageType, ProfileType } from '../../../types/Chat';
import type { WalletType } from '../../../types/Wallet';
import i18n from '../../../global/i18n';
import type { DAppChatContext } from '../../../types/DApp';
import type { State as DAppsState } from '../../../reducers/dApps';
import { getDApp } from '../../../reducers/dApps';
import { openDApp, setDAppContext } from '../../../actions/dApps';
import DAppMessage from '../../../components/common/DAppMessage';
import type { Account } from '../../../types/Account';

type Props = {
  /**
   * @desc React Native Navigation navigator object
   */
  navigator: Navigator,
  /**
   * @desc Id of chat that screen is related to.
   */
  chatId: number,
  /**
   * @desc Chat object of displayed chat or null if there is no chat with that id.
   */
  chat: ChatType | null,
  /**
   * @desc Map of chat partners profiles. See Redux state for details.
   */
  profiles: { [string]: ProfileType },
  /**
   * @desc Flag that indicates if messages are currently being fetched.
   */
  isFetching: boolean,
  /**
   * @desc Account of current user.
   */
  currentAccount: Account,
  /**
   * @desc Current account identity key.
   */
  currentAccountIdentityKey: string,
  /**
   * @desc The whole DApps reducer state.
   */
  dAppsState: DAppsState,
  /**
   * @desc Array of user wallets.
   */
  wallets: Array<WalletType>,
}

type Actions = {
  /**
   * @desc Function to send a message to the chat
   * @param {number} chatId Id of chat to send message to.
   * @param {string} message Message plain text to be sent.
   * @return {void}
   */
  sendMessage: (chatId: number, message: string) => void,
  /**
   * @desc Function to initiate messages fetch. Used to get initial messages or to fetch earlier messages.
   */
  loadMessages: (chatId: number, startId?: string) => void,
  /**
   * @desc Open DApp.
   */
  openDApp: (dAppPublicKey: string) => void,
  /**
   * @desc Set context for DApps.
   */
  setDAppContext: (context: DAppChatContext | null) => void,
  /**
   * @desc Function to mark all messages as read.
   */
  markMessagesAsRead: (chatId: number) => void,
};

class ChatScreen extends Component<Props & Actions, *> {
  constructor(props) {
    super(props);

    this.state = {
      selectedMessage: null,
    };
  }

  componentDidMount() {
    this.props.setDAppContext(this.buildContext());
    setImmediate(() => {
      this.props.loadMessages(this.props.chatId);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { chat } = this.props;
    if (chat != null && chat.unreadMessages === true) {
      this.props.markMessagesAsRead(this.props.chatId);
    }

    const { selectedMessage } = this.state;
    if (selectedMessage === prevState.selectedMessage) return;
    if (selectedMessage == null) return;

    this.messageActionSheet.show();
  }

  componentWillUnmount() {
    this.props.setDAppContext(null);
  }

  onSendMessage(message: ?Object) {
    if (message == null) return;

    const { text } = message;
    if (text.trim().length === 0) {
      return;
    }

    this.props.sendMessage(this.props.chatId, text.trim());
  }

  onSelectDAppToOpen = (index) => {
    if (index < this.props.dAppsState.availableDApps.length) {
      this.props.openDApp(this.props.dAppsState.availableDApps[index].publicKey);
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
    const { chat } = this.props;
    if (chat === null) {
      return null;
    }

    // @todo Build correct context for p2p and group chats.
    const partner = this.props.profiles[chat.members[0]];

    if (partner == null) {
      return null;
    }

    const context: DAppChatContext = {
      partner: {
        name: partner.name,
        identityKey: partner.identityKey,
        ethereumAddress: partner.ethereumAddress,
      },
      account: {
        name: this.props.currentAccount.name,
        identityKey: this.props.currentAccountIdentityKey,
        ethereumAddress: this.props.wallets[0].ethAddress,
      },
    };

    return context;
  }

  dAppsActionSheet: any;
  messageActionSheet: any;

  render() {
    const { chat } = this.props;

    if (chat == null) {
      // @todo Implement logic in case we open screen for nonexistent chat.
      return <View />;
    }

    const dAppsOptions = [
      ...this.props.dAppsState.availableDApps.map(dApp => dApp.name),
      i18n.t('screens.chat.cancel'),
    ];

    let messages: Array<GiftedChatMessageType> = chat.messages;
    messages = messages
      .map((message) => {
        if (message.dAppMessage == null) {
          const identityKey = message.user._id;
          let userName = '??';

          console.log(`[CHAT] Here: ${identityKey}, ${this.props.currentAccountIdentityKey}`);

          if (this.props.profiles[identityKey] != null) {
            userName = this.props.profiles[identityKey].name;
          } else if (identityKey === this.props.currentAccountIdentityKey) {
            userName = this.props.currentAccount.name;
          }

          return {
            ...message,
            user: {
              _id: identityKey,
              name: userName,
            },
          };
        }

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
      _id: this.props.currentAccountIdentityKey,
      name: this.props.currentAccount.name,
    };
    const earliestMessageId = (messages[0] && messages[0]._id) || '0';

    return (
      <View style={styles.container}>
        <BackgroundImage />
        <FakeNavigationBar navBarHidden={false} />

        <GiftedChat
          messages={messages.reverse()}
          onSend={messagesToSend => this.onSendMessage(messagesToSend[0])}
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
            if (dAppMessage == null) {
              // return (
              //   <View style={styles.customView}>
              //     <Image
              //       source={AssetsImages.moreMenuIcon}
              //       style={styles.sectionListDisclosure}
              //     />
              //   </View>
              // );
              return null;
            }

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
          renderActions={props => <ChatActions {...props} containerStyle={styles.actionContainerStyle} />}
          loadEarlier
          onLoadEarlier={() => this.props.loadMessages(this.props.chatId, earliestMessageId)}
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
  chat: getChatById(state.chat, state.chat.openedChatId),
  profiles: state.chat.partnerProfiles,
  chatId: state.chat.openedChatId,
  currentAccountIdentityKey: state.accounts.currentAccountIdentityKey,
  isFetching: state.chat.isFetching,
  currentAccount: getCurrentAccount(state.accounts),
  dAppsState: state.dApps,
  wallets: state.wallet.wallets,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (publicKey, msg) => dispatch(sendMessage(publicKey, msg)),
  openDApp: dAppPublicKey => dispatch(openDApp(dAppPublicKey)),
  setDAppContext: context => dispatch(setDAppContext(context)),
  loadMessages: (publicKey, fromMessageId) => dispatch(loadChatMessages(publicKey, fromMessageId)),
  markMessagesAsRead: publicKey => dispatch(changeUnreadStatus(publicKey, false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

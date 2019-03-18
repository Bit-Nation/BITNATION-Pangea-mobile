// @flow

import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import config from 'react-native-config';
import SocketIOClient from 'socket.io-client';
import {
  GiftedChat,
  Composer,
  InputToolbar,
  Bubble,
} from 'react-native-gifted-chat';
import AssetsImages from 'pangea-common-reactnative/assets/AssetsImages';

import BitnationMessage from './PrivateChat/Chat/BitnationMessage';
import BitnationInputToolbar from './PrivateChat/Chat/BitnationInputToolbar';
import styles from './styles';

import { showSpinner, hideSpinner } from '@pangea/chat/chat-actions';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import Loading from 'pangea-common-reactnative/UI/Loading';
import { resolveNation } from '@pangea/nations/nations-utils';
import deprecatedCreateGiftedChatMessageObject from '@pangea/chat/chat-utils';
import type { NationIdType, NationType } from '@pangea/nations/nation-types';
import type { Navigator } from 'pangea-common-reactnative/ReactNativeNavigation-types';
import LucyBot from '../../../vendor/LucyBot';
import { getCurrentAccount } from '@pangea/accounts/accounts-reducers';

type Props = {
  /**
   * @desc React Native Navigation navigator object
   */
  navigator: Navigator,
  /**
   * @desc A boolean prop to indicate whether the channel is a bot or not
   */
  isBot: boolean,
  /**
   * @desc List of nations
   */
  nations: Array<NationType>,
  /**
   * @desc Id of the selected nation
   */
  nationId: NationIdType,
  /**
   * @desc Current user object
   */
  user: any,
  /**
   * @desc Flag that indicates the loading status
   */
  isFetching: boolean,
  /**
   * @desc Function to show spinner
   */
  showSpinner: () => void,
  /**
   * @desc Function to hide spinner
   */
  hideSpinner: () => void
};

type State = {
  /**
   * @desc List of messages
   */
  messages: Array<any>,
  /**
   * @desc Flag that indicates whether the socket connection is established
   */
  joined: boolean
};

class ChatScreen extends Component<Props, State> {
  static defaultProps = {
    isBot: true,
  };


  constructor(props: Props) {
    super(props);

    if (props.isBot !== true) {
      const selectedNation = resolveNation(props.nations || [], props.nationId);
      if (selectedNation === null) {
        props.navigator.pop();
        return;
      }
      this.nationId = selectedNation.idInSmartContract;
      // Creating the socket-client instance will automatically connect to the server.
      this.connection = SocketIOClient(config.CHAT_URL, {
        transports: ['websocket'],
        upgrade: false,
        query: `token=${config.AUTH_TOKEN}`,
      });
      this.connection.on('connect', () => {
        this.connection.emit('room:join', {
          nation_id: this.nationId,
        });
      });

      this.state = {
        messages: [],
        joined: false,
      };
    } else {
      // add initial bot message
      this.state = {
        messages: [
          {
            _id: 1,
            text: LucyBot.start(),
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Lucy 1.0',
              avatar: AssetsImages.lucyIcon,
            },
            // Any additional custom parameters are passed through
          },
        ],
        joined: false,
      };
    }
  }

  componentDidMount() {
    if (this.props.isBot !== true && this.connection) {
      this.props.showSpinner();
      // load initial messages
      const URL = `${config.CHAT_URL}/messages/${this.nationId}?auth_token=${config.AUTH_TOKEN}`;
      fetch(URL)
        .then(response => response.json())
        .then(
          (json) => {
            const messages = deprecatedCreateGiftedChatMessageObject(json.reverse());
            this.props.hideSpinner();
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, messages),
            }));
          },
          () => {
            this.props.hideSpinner();
          },
        );

      // add socket listener
      this.connection.on('room:joined', (data) => {
        if (data.nation_id >= 0) {
          this.setState({ joined: true });
          this.connection.on('msg', (messageData) => {
            const messages = deprecatedCreateGiftedChatMessageObject([messageData]);
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, messages),
            }));
          });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.connection !== null && this.connection !== undefined) {
      this.connection.disconnect();
    }
  }

  onSend(messages: Array<any> = []) {
    if (this.props.isBot === true) {
      const m = [
        {
          _id: this.state.messages.length + 1,
          text: LucyBot.reply(messages[0].text),
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Lucy 1.0',
            avatar: AssetsImages.lucyIcon,
          },
        },
      ];

      // Add user's message
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));

      // Add Eliza's response
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, m),
      }));
    } else if (this.state.joined === true) {
      const newMessage = {
        nation_id: this.nationId,
        msg: messages[0].text,
        from: this.props.user ? this.props.user.name : 'anonymous',
        userId: this.props.user ? this.props.user.id : 'anonymous',
      };
      this.connection.emit('room:msg', newMessage);
    }
  }

  nationId: number;
  connection: any;

  renderMessage(props) {
    return (
      <BitnationMessage {...props} />
    );
  }

  renderInputToolbar(props) {
    return (
      <BitnationInputToolbar
        {...props}

      />
    );
  }

  render() {
    const sendingUser = {
      _id: this.props.user ? this.props.user.id : 'anonymous',
      name: this.props.user ? this.props.user.name : 'anonymous',
    };
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <FakeNavigationBar navBarHidden={false} />
        <GiftedChat
          alwaysShowSend
          showAvatarForEveryMessage
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={sendingUser}
          bottomOffset={Platform.OS === 'ios' ? 48.5 : 0}
          renderInputToolbar={this.renderInputToolbar}
          renderMessage={this.renderMessage}
        />
        {this.props.isFetching && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nations: state.nations.nations,
  nationId: state.nations.openedNationId,
  user: getCurrentAccount(state.accounts),
  isFetching: state.chat.isFetching,
});

const mapDispatchToProps = dispatch => ({
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

// @flow

import React, { Component } from 'react';
import {
  View,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import config from 'react-native-config';
import SocketIOClient from 'socket.io-client';
import { GiftedChat, Composer, InputToolbar, Bubble } from 'react-native-gifted-chat';
import styles from './styles';

import { showSpinner, hideSpinner } from '../../actions/chat';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import Loading from '../../components/common/Loading';
import { resolveNation } from '../../utils/nations';
import createGiftedChatMessageObject from '../../utils/chat';
import type { NationType } from '../../services/database/schemata';
import elizabot from '../../../vendor/elizabot';

type Props = {
  /**
   * @desc A boolean prop to indicate whether the channel is a bot or not
   */
  isBot: boolean,
  /**
   * @desc List of nations
   */
  nations?: Array<NationType>,
  /**
   * @desc Id of the selected nation
   */
  nationId: number,
  /**
   * @desc Current user object
   */
  user?: any,
  /**
   * @desc Flag that indicates the loading status
   */
  isFetching?: boolean,
  /**
   * @desc Function to show spinner
   */
  showSpinner: () => void,
  /**
   * @desc Function to hide spinner
   */
  hideSpinner: () => void,
};

type State = {
  /**
   * @desc List of messages
   */
  messages: Array<any>,
  /**
   * @desc Flag that indicates wheter the socket connection is established
   */
  joined: boolean
};

class ChatScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if (props.isBot !== true) {
      const selectedNation = resolveNation(props.nations, props.nationId);
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
            text: elizabot.start(),
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Dr. FreudBot',
            },
            // Any additional custom parameters are passed through
          },
        ],
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
        .then((json) => {
          const messages = createGiftedChatMessageObject(json.reverse());
          this.props.hideSpinner();
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
          }));
        }, () => {
          this.props.hideSpinner();
        });

      // add socket listener
      this.connection.on('room:joined', (data) => {
        if (data.nation_id >= 0) {
          this.setState({ joined: true });
          this.connection.on('msg', (messageData) => {
            const messages = createGiftedChatMessageObject([messageData]);
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
          text: elizabot.reply(messages[0].text),
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Dr. FreudBot',
          },
        },
      ];

      // Add user's message
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));

      // Add Eliza's response
      this.setState(previousState => ({ messages: GiftedChat.append(previousState.messages, m) }));
    } else if (this.state.joined === true) {
      const newMessage = {
        nation_id: this.nationId,
        msg: messages[0].text,
        from: this.props.user ? this.props.user.name : 'anonymous',
        userId: this.props.user ? this.props.user.uid : 'anonymous',
      };
      this.connection.emit('room:msg', newMessage);
    }
  }

  nationId: number;
  connection: any;

  render() {
    const sendingUser = {
      _id: this.props.user ? this.props.user.uid : 'anonymous',
      name: this.props.user ? this.props.user.name : 'anonymous',
    };
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <FakeNavigationBar navBarHidden />

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={sendingUser}
          bottomOffset={Platform.OS === 'ios' ? 48.5 : 0}
          renderComposer={props =>
            <Composer {...props} textInputStyle={styles.composer} />
          }
          renderInputToolbar={props =>
            <InputToolbar {...props} containerStyle={styles.inputToolbar} />
          }
          renderBubble={props =>
            <Bubble {...props} customTextStyle={styles.customTextStyle} />
          }
        />
        {this.props.isFetching && <Loading />}
      </View>
    );
  }
}


const mapStateToProps = state => ({
  nations: state.nations.nations,
  nationId: state.nations.openedNationId,
  user: state.profile.user,
  isFetching: state.chat.isFetching,
});

const mapDispatchToProps = dispatch => ({
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

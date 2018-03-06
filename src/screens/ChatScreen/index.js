/*

  Demonstration Chat system

  Elizabot : https://github.com/brandongmwong/elizabot-js/blob/master/README.md

  Eliza JS bot based on www.masswerk.at/elizabot and http://en.wikipedia.org/wiki/ELIZA

  Usage:

  var elizabot = require('./elizabot.js');

  elizabot.start() // initializes eliza and returns a greeting message

  elizabot.reply(msgtext) // returns a eliza-like reply based on the message text passed into it

  elizabot.bye() // returns a farewell message
 */


import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from 'react-native-config';
import SocketIOClient from 'socket.io-client';
import styles from './styles';
import { GiftedChat, Composer, InputToolbar, Bubble } from 'react-native-gifted-chat';
import AssetsImages from '../../global/AssetsImages';

import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';

import elizabot from '../../../vendor/elizabot';

class ChatScreen extends React.Component {
  
  constructor(props) {
    super(props);
  
    // Creating the socket-client instance will automatically connect to the server.
    this.connection = SocketIOClient(config.CHAT_URL, {
      transports: ['websocket'], 
      upgrade: false, 
      query: `token=${config.AUTH_TOKEN}`
    });
    this.connection.on('connect', () => {
      this.connection.emit('room:join', {
        nation_id: props.nationId
      });

      this.connection.on('room:joined', (data) => {
        if (data.nation_id >= 0) {
          this.setState({joined: true});
          this.connection.on('msg', (messageData) => {
            console.log('got message: ', messageData);
          });
        }
      });
    });
    this.state = {
      messages: [],
      joined: false
    };
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: elizabot.start(),
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Eliza',
          },
          // Any additional custom parameters are passed through
        },
      ],
    });

    const URL = `${config.CHAT_URL}/${this.props.nationId}?auth_token=${config.AUTH_TOKEN}`;
    // fetch(URL)
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(json) {
    //   console.log('response: ', json);
    // });
  }

  onSend(messages = []) {
    // const m = [
    //   {
    //     _id: this.state.messages.length + 1,
    //     text: elizabot.reply(messages[0].text),
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'Eliza',
    //     },
    //   },
    // ];

    // // Add user's message
    // this.setState(previousState => ({ messages: GiftedChat.append(previousState.messages, messages) }));

    // // Add Eliza's response
    // this.setState(previousState => ({ messages: GiftedChat.append(previousState.messages, m) }));
    if (this.state.joined) {
      console.log('emit message: ', this.props.nationId);
      this.connection.emit('room:msg', {
        nation_id: this.props.nationId,
        msg: messages[0].text,
        from: this.props.user ? this.props.user.name : 'anonymous'
      });
    } else {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage />
        <FakeNavigationBar navBarHidden />

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
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
      </View>
    );
  }
}


const mapStateToProps = state => ({
  nationId: state.nations.openedNationId,
  user: state.profile.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

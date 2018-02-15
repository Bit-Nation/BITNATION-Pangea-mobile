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
import styles from './styles';
import { GiftedChat, Composer, InputToolbar, Bubble } from 'react-native-gifted-chat';
import AssetsImages from '../../global/AssetsImages';

import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';

import elizabot from '../../../vendor/elizabot';

class ChatScreen extends React.Component {

  state = {
    messages: [],
  };


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
  }

  onSend(messages = []) {
    const m = [
      {
        _id: this.state.messages.length + 1,
        text: elizabot.reply(messages[0].text),
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Eliza',
        },
      },
    ];

    // Add user's message
    this.setState((previousState) => ({ messages: GiftedChat.append(previousState.messages, messages), }));

    // Add Eliza's response
    this.setState((previousState) => ({ messages: GiftedChat.append(previousState.messages, m), }));
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar navBarHidden/>

        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          bottomOffset={Platform.OS === 'ios' ? 48.5 : 0}
          renderComposer={(props) =>
            <Composer {...props} textInputStyle={styles.composer}/>
          }
          renderInputToolbar={(props) =>
            <InputToolbar {...props} containerStyle={styles.inputToolbar}/>
          }
          renderBubble={(props) =>
            <Bubble {...props} customTextStyle={styles.customTextStyle}/>
          }
        />
      </View>
    );
  }

}


const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

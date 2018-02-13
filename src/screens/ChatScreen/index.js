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


class ChatScreen extends React.Component {

  state = {
    messages: [],
  };


  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello, David what\'s cracking?',
          // createdAt: new Date(),
          createdAt: new Date(Date.UTC(2018, 1, 14, 20, 20, 0)),
          user: {
            _id: 2,
            name: 'Girl',
            // avatar: 'https://image.flaticon.com/icons/png/128/220/220126.png',
          },
          // showUserAvatar: true,
        },
        {
          _id: 2,
          text: 'What\'s the status of our agreement? Can we schedule a call for later this week?',
          createdAt: new Date(Date.UTC(2018, 1, 14, 17, 20, 0)),
          user: {
            _id: 3,
            name: 'Piggie',
            // avatar: 'https://image.flaticon.com/icons/png/128/220/220127.png',
          },
          // showUserAvatar: true,
          // Any additional custom parameters are passed through
        },
        {
          _id: 3,
          text: 'My message ',
          createdAt: new Date(Date.UTC(2018, 1, 14, 17, 20, 0)),
          user: {
            _id: 1,
            name: 'David',
          },
          // Any additional custom parameters are passed through
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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
          bottomOffset={Platform.OS == 'ios' ? 48.5 : 0}
          renderComposer={(props) =>
            <Composer {...props} textInputStyle={styles.composer}/>
          }
          renderInputToolbar={(props) =>
            <InputToolbar {...props} containerStyle={styles.inputToolbar}/>
          }
          renderBubble={(props) =>
            <Bubble {...props} customTextStyle={ styles.customTextStyle } />
          }
          renderAvatar={null}
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

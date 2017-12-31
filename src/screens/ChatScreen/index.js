import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GiftedChat } from 'react-native-gifted-chat';
import AssetsImages from "../../global/AssetsImages";

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
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Girl',
                       avatar: 'https://image.flaticon.com/icons/png/128/220/220126.png',
                    },
                    showUserAvatar : true,
                },
                {
                    _id: 2,
                    text: 'What\'s the status of our agreement? Can we schedule a call for later this week?',
                    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                    user: {
                        _id: 3,
                        name: 'Piggie',
                        avatar: 'https://image.flaticon.com/icons/png/128/220/220127.png',
                    },
                    showUserAvatar : true,
                    // Any additional custom parameters are passed through
                },
                {
                    _id: 3,
                    text: 'My message ',
                    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
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

            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />

        );
        return (
          <View
            style={{
              flexDirection: 'row',
              height: 100,
              padding: 20,
            }}>
              <View style={{backgroundColor: 'blue', flex: 0.3}} />
          </View>
        );
    }

}





const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

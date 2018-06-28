// @flow
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

import { showSpinner, hideSpinner } from '../../../actions/chat';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import type { ChatSessionType } from '../../../types/Chat';
import { getCurrentAccount } from '../../../reducers/accounts';

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
   * @desc The chat session
   */
  session: ChatSessionType,
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
  messages: Array<any>
};

class ChatScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {

  }

  onSend(messages: Array<any> = []) {
    const newMessage = {
      msg: messages[0].text,
      from: this.props.user ? this.props.user.name : 'anonymous',
      userId: this.props.user ? this.props.user.id : 'anonymous',
    };
  }

  render() {
    const sendingUser = {
      _id: this.props.user ? this.props.user.id : 'anonymous',
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
});

const mapDispatchToProps = dispatch => ({
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

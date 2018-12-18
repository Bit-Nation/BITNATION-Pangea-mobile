/* eslint-disable no-underscore-dangle, no-use-before-define, react-native/no-inline-styles */

import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';

import { Avatar, Day, utils } from 'react-native-gifted-chat';
import Bubble from './BitnationBubble';

const { isSameUser, isSameDay } = utils;

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
    },
  }),
};

export default class Message extends React.Component {
  getInnerComponentProps() {
    const { containerStyle, ...props } = this.props;
    return {
      ...props,
      isSameUser,
      isSameDay,
    };
  }

  renderDay() {
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();
      if (this.props.renderDay) {
        return this.props.renderDay(dayProps);
      }
      return <Day {...dayProps} />;
    }
    return null;
  }

  renderBubble() {
    const bubbleProps = this.getInnerComponentProps();
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps);
    }
    return <Bubble {...bubbleProps} />;
  }

  renderAvatar() {
    if (this.props.user._id === this.props.currentMessage.user._id && !this.props.showUserAvatar) {
      return null;
    }
    const avatarProps = this.getInnerComponentProps();
    const { currentMessage } = avatarProps;
    if (currentMessage.user.avatar === null) {
      return null;
    }
    return <Avatar {...avatarProps} />;
  }

  render() {
    const sameUser = isSameUser(this.props.currentMessage, this.props.nextMessage);

    return (
      <View>
        {this.renderDay()}
        {this.props.currentMessage.system ? (
          this.renderSystemMessage()
        ) : (
          <View
            style={[
              styles[this.props.position].container,
              { marginBottom: sameUser ? 2 : 10 },
              this.props.containerStyle[this.props.position],
            ]}
          >
            {this.props.position === 'left' ? this.renderAvatar() : null}
            {this.renderBubble()}
            {this.props.position === 'right' ? this.renderAvatar() : null}
          </View>
        )}
      </View>
    );
  }
}

Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  currentMessage: {},
  position: 'left',
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
};

Message.propTypes = {
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
};

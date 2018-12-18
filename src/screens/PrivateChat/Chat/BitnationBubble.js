/* eslint-disable no-underscore-dangle, no-use-before-define */

import PropTypes from 'prop-types';
import React from 'react';
import { MessageText, MessageImage, Time, utils } from 'react-native-gifted-chat';
import {
  Text,
  Clipboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';
import Colors from '../../../global/colors';

const { isSameUser, isSameDay } = utils;

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  onLongPress() {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context);
    } else if (this.props.currentMessage.text) {
      const options = [
        'Copy Text',
        'Cancel',
      ];
      const cancelButtonIndex = options.length - 1;
      this.context.actionSheet().showActionSheetWithOptions(
        { options, cancelButtonIndex },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            Clipboard.setString(this.props.currentMessage.text);
          }
        },
      );
    }
  }

  handleBubbleToNext() {
    if (
      isSameUser(this.props.currentMessage, this.props.nextMessage) &&
      isSameDay(this.props.currentMessage, this.props.nextMessage)
    ) {
      return StyleSheet.flatten([
        styles[this.props.position].containerToNext,
        this.props.containerToNextStyle[this.props.position],
      ]);
    }
    return null;
  }

  handleBubbleToPrevious() {
    if (
      isSameUser(this.props.currentMessage, this.props.previousMessage) &&
      isSameDay(this.props.currentMessage, this.props.previousMessage)
    ) {
      return StyleSheet.flatten([
        styles[this.props.position].containerToPrevious,
        this.props.containerToPreviousStyle[this.props.position],
      ]);
    }
    return null;
  }


  renderMessageText() {
    if (this.props.currentMessage.text) {
      const { containerStyle, wrapperStyle, ...messageTextProps } = this.props;
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }
      return (
        <MessageText
          {...messageTextProps}
          textStyle={{
            left: [styles.standardFont, styles[this.props.position].textStyle],
            right: [styles.standardFont, styles[this.props.position].textStyle],
          }}
          linkStyle={{
            left: [styles.standardFont, styles[this.props.position].linkStyle],
            right: [styles.standardFont, styles[this.props.position].linkStyle],
          }}
        />
      );
    }
    return null;
  }

  renderMessageImage() {
    if (this.props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = this.props;
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps);
      }
      return <MessageImage {...messageImageProps} imageStyle={[styles.bitnationImage, messageImageProps.imageStyle]} />;
    }
    return null;
  }

  renderTicks() {
    const { currentMessage } = this.props;
    if (this.props.renderTicks) {
      return this.props.renderTicks(currentMessage);
    }
    if (currentMessage.user._id !== this.props.user._id) {
      return null;
    }
    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={[styles.headerItem, styles.tickView]}>
          {currentMessage.sent && <Text style={[styles.standardFont, styles.tick, this.props.tickStyle]}>✓</Text>}
          {currentMessage.received && <Text style={[styles.standardFont, styles.tick, this.props.tickStyle]}>✓</Text>}
        </View>
      );
    }
    return null;
  }

  renderUsername() {
    const username = this.props.currentMessage.user.name;
    if (username) {
      const { containerStyle, wrapperStyle, ...usernameProps } = this.props;
      if (this.props.renderUsername) {
        return this.props.renderUsername(usernameProps);
      }
      return (
        <Text style={[styles.standardFont, styles.headerItem, styles.username, this.props.usernameStyle]}>
          {username}
        </Text>
      );
    }
    return null;
  }

  renderTime() {
    if (this.props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = this.props;
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps);
      }
      return (
        <View style={styles.timeView}>
          <Time
            {...timeProps}
            containerStyle={{ left: [styles.timeContainer] }}
            textStyle={{
              left: [styles.headerFont, styles[this.props.position].textStyle],
              right: [styles.headerFont, styles[this.props.position].textStyle],
            }}
          />
        </View>
      );
    }
    return null;
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props);
    }
    return null;
  }

  render() {
    return (
      <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
        <View
          style={[
            styles[this.props.position].wrapper,
            this.props.wrapperStyle[this.props.position],
            this.handleBubbleToNext(),
            this.handleBubbleToPrevious(),
          ]}
        >
          <TouchableOpacity
            onLongPress={this.onLongPress}
            accessibilityTraits='text'
            {...this.props.touchableProps}
          >
            <View style={[styles.wrapper, this.props.wrapperStyle]}>

              {this.renderCustomView()}
              <View style={styles.headerView}>
                {this.renderUsername()}
                {this.renderTime()}
                {/* {this.renderTicks()} */}
              </View>
              {this.renderMessageImage()}
              {this.renderMessageText()}

            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      width: '90%',
      borderRadius: 15,
      backgroundColor: Colors.white,
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
    textStyle: {
      color: Colors.BitnationDarkGrayColor,
      fontFamily: 'Roboto',
    },
    linkStyle: {
      color: Colors.BitnationDarkGrayColor,
      fontFamily: 'Roboto',
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      width: '90%',
      borderRadius: 15,
      backgroundColor: Colors.white,
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
    textStyle: {
      color: Colors.BitnationDarkGrayColor,
      fontFamily: 'Roboto',
    },
    linkStyle: {
      color: Colors.BitnationDarkGrayColor,
      fontFamily: 'Roboto',
    },
  }),
  standardFont: {
    fontSize: 15,
  },
  headerFont: {
    fontSize: 12,
  },
  headerView: {
    // Try to align it better with the avatar on Android.
    marginTop: Platform.OS === 'android' ? 5 : 6,
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingLeft: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  timeView: {
    // width: '100%',
    // justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  threeDotsIcon: {
    color: Colors.BitnationLinkOrangeColor,
    fontSize: 25,
    marginRight: 5,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tick: {
    fontSize: 10,
    backgroundColor: 'transparent',
    color: Colors.white,
  },
  tickView: {
    flexDirection: 'row',
    marginRight: 10,
  },
  username: {
    fontSize: 12,
    color: '#ca9103',
  },
};

Bubble.contextTypes = {
  actionSheet: PropTypes.func,
};

Bubble.defaultProps = {
  touchableProps: {},
  onLongPress: null,
  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  renderTime: null,
  position: 'left',
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  tickStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
};

Bubble.propTypes = {
  onLongPress: PropTypes.func,
  renderMessageImage: PropTypes.func,
  renderMessageText: PropTypes.func,
  renderCustomView: PropTypes.func,
  renderUsername: PropTypes.func,
  renderTime: PropTypes.func,
  renderTicks: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  wrapperStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  messageTextStyle: Text.propTypes.style,
  usernameStyle: Text.propTypes.style,
  tickStyle: Text.propTypes.style,
  containerToNextStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  containerToPreviousStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
};

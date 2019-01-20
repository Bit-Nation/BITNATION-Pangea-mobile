/* eslint-disable */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Keyboard, ViewPropTypes, Image, TouchableOpacity } from 'react-native';
import { Composer, Send } from 'react-native-gifted-chat';
import Colors from '../../../global/colors';
import AssetsImages from '../../../global/AssetsImages';

export default class InputToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);

    this.state = {
      position: 'absolute',
    };
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  keyboardWillShow() {
    if (this.state.position !== 'relative') {
      this.setState({
        position: 'relative',
      });
    }
  }

  keyboardWillHide() {
    if (this.state.position !== 'absolute') {
      this.setState({
        position: 'absolute',
      });
    }
  }

  renderActions() {
    if (this.props.onPressActionButton) {
      return (
        <TouchableOpacity
          style={styles.wrapperAction}
          onPress={this.props.onPressActionButton}
        >
          <Image
            style={styles.actionImage}
            source={AssetsImages.ChatUI.actionChatIcon}
          />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderSend() {
    const { text } = this.props;
    return (
      <Send {...this.props}>
        <View style={styles.wrapperSendView}>
          <Image
            style={styles.sendImage}
            source={text.trim().length > 0 ? AssetsImages.ChatUI.sendChatActiveIcon : AssetsImages.ChatUI.sendChatInActiveIcon}
          />
        </View>
      </Send>
    );
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return <Composer {...this.props} textInputStyle={styles.textInputStyle} />;
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>{this.props.renderAccessory(this.props)}</View>
      );
    }
    return null;
  }

  /* eslint-disable no-console */
  render() {
    return (
      <View style={[styles.container, this.props.containerStyle, { position: this.state.position }]}>
        <View style={[styles.primary, { paddingRight: this.props.onPressActionButton ? 20 : 5 }, this.props.primaryStyle]}>
          {this.renderActions()}
          <View style={[styles.wrapperInputStyle, { marginRight: this.props.onPressActionButton ? 20 : 10 }]}>
            {this.renderComposer()}
            {this.renderSend()}
          </View>
        </View>
        {this.renderAccessory()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0,
    backgroundColor: Colors.chatColor,
    paddingRight: 5,
    bottom: 0,
    left: 0,
    right: 0,
  },
  wrapperInputStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 4,
  },
  textInputStyle: {
    // backgroundColor: Colors.white,
    // borderRadius: 5,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 5,
    paddingRight: 20,
  },
  accessory: {
    height: 44,
  },
  wrapperAction: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  actionImage: {
    width: '100%',
    height: '100%',
    tintColor: Colors.white,
  },
  wrapperSendView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendImage: {
    width: 33,
    height: 33,
    marginRight: 10,
  },
});

InputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
  onPressActionButton: () => { },
};

InputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style,
};

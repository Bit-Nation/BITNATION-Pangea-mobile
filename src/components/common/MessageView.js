import React, { Component } from 'react';
import { View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';

import Text from './Text';
import Colors from '../../global/Colors';
import Button from './Button';

export default class MessageView extends Component {

  render() {

    const { style, renderBottom, renderAdditionalInfo, children } = this.props;

    return (
      <View style={[styles.messageView, style]}>
        <View style={styles.messageContainer}>
          {children}
          {
            this.props.title &&
            <Text messageTitle>
              {this.props.title}
            </Text>
          }
          {
            this.props.messageText &&
            <Text messageText style={styles.messageText}>
              {this.props.messageText}
            </Text>
          }
          {renderAdditionalInfo && renderAdditionalInfo()}
          {
            this.props.onButtonClick &&
            <Button style={styles.button} title={this.props.buttonTitle} onPress={this.props.onButtonClick}/>
          }
          {renderBottom && renderBottom()}
        </View>
      </View>
    );
  }

}

MessageView.PropTypes = {
  title: PropTypes.string,
  messageText: PropTypes.string,
  buttonTitle: PropTypes.string,
  onButtonClick: PropTypes.function,
};

const styles = MediaQueryStyleSheet.create({
  messageView: {
    borderRadius: 8,
    backgroundColor: Colors.getBitNationBlue(0.2),
  },
  messageContainer: {
    paddingTop: 12,
    paddingBottom: 22,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  messageText: {
    marginTop: 5,
  },
  button: {
    marginTop: 13,
  }
});

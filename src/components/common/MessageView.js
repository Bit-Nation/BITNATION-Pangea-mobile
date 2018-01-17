import React, { Component } from 'react';
import { View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';

import Colors from '../../global/Colors';
import GlobalStyles from '../../global/Styles';

import Text from './Text';
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
  ...GlobalStyles,
});

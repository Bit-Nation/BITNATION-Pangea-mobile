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

          {/* TITLE + ICON */}
          <View style={styles.messageTitleRowContainer}>
            {
              this.props.title &&
                <View style={styles.messageTitleContainer}>
                 <Text style={styles.panelTitle}>
                  {this.props.title}
                </Text>
                </View>
            }
            {
              this.props.icon &&
              <View style={styles.messageTitleIcon}>
                <Text style={styles.panelTitle}>
                  {this.props.icon}
                </Text>
              </View>
            }
          </View>

          {/* MAIN DISPLAY AREA */}

          {children}

          {
            this.props.messageText &&
            <View style={styles.messageTextContainer}>
              <Text style={styles.body}>
              {this.props.messageText}
            </Text>
            </View>
          }

          <View style={styles.messageAdditionalInfoContainer}>
          {renderAdditionalInfo && renderAdditionalInfo()}
          </View>
          {
            this.props.onButtonClick &&
            <Button style={styles.button} title={this.props.buttonTitle} onPress={this.props.onButtonClick}/>
          }
          <View style={styles.messageBottomContainer}>
          {renderBottom && renderBottom()}
          </View>
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

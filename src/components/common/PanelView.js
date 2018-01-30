import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';
import _ from 'lodash';

import GlobalStyles from '../../global/Styles';
import Button from './Button';

export default class PanelView extends Component {

  render() {
    const { style, renderBottom, renderAdditionalInfo, children } = this.props;

    return (
      <View style={[styles.messageView, style]}>

        {/* TITLE + ICON */}
        {/* Hide this view if no title or icon to avoid line below it. */}
        {
          (!_.isEmpty(this.props.title) || !_.isEmpty(this.props.icon)) &&
          this._renderHeader(this.props.title, this.props.icon)
        }

        {/* MAIN DISPLAY AREA */}
        <View style={styles.messageTextContainer}>
          {children}
        </View>

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
          <Button style={styles.button} title={this.props.buttonTitle}
                  onPress={this.props.onButtonClick}/>
        }

        <View style={styles.messageBottomContainer}>
          {renderBottom && renderBottom()}
        </View>

      </View>
    );
  }

  _renderHeader(title, icon) {
    return (
      <View style={styles.messageTitleRowContainer}>
        {
          title &&
          <View style={styles.messageTitleContainer}>
            <Text style={styles.panelTitle}>
              {title}
            </Text>
          </View>
        }
        {
          icon &&
          <View style={styles.messageTitleIcon}>
            <Text style={styles.panelTitle}>
              {icon}
            </Text>
          </View>
        }
      </View>
    );
  }

}

PanelView.PropTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  messageText: PropTypes.string,
  buttonTitle: PropTypes.string,
  onButtonClick: PropTypes.function,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';
import _ from 'lodash';

import GlobalStyles from '../../global/Styles';
import Button from './Button';

/**
 * @desc Component that renders common panel view. It is used to provide list or mosaic layout.
 * @type React.Component
 */
export default class PanelView extends Component {

  render() {
    const { style, renderBottom, renderAdditionalInfo, children } = this.props;

    return (
      <View style={[styles.panelView, style]}>

        {/* TITLE + ICON */}
        {/* Hide this view if no title or icon to avoid line below it. */}
        {
          (!_.isEmpty(this.props.title) || !_.isEmpty(this.props.icon)) &&
          this._renderHeader(this.props.title, this.props.icon)
        }

        {/* MAIN DISPLAY AREA */}
        <View style={styles.panelTextContainer}>
          {children}
        </View>

        {
          this.props.body &&
          <View style={styles.panelTextContainer}>
            <Text style={styles.body}>
              {this.props.body}
            </Text>
          </View>
        }

        <View style={styles.messageAdditionalInfoContainer}>
          {renderAdditionalInfo && renderAdditionalInfo()}
        </View>

        {
          this.props.onButtonClick &&
          <Button style={styles.panelButton} title={this.props.buttonTitle}
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
      <View style={styles.panelTitleRowContainer}>
        {
          title &&
          <View style={styles.panelTitleContainer}>
            <Text style={styles.panelTitle}>
              {title}
            </Text>
          </View>
        }
        {
          icon &&
          <View style={styles.panelTitleIcon}>
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
  /**
   * @desc Title of panel
   * @type string
   */
  title: PropTypes.string,
  /**
   * @desc Icon of panel
   * @type string
   * @todo Fix icon to be the icon. Currently it's just a text.
   */
  icon: PropTypes.string,
  /**
   * @desc Body text of panel
   * @type string
   */
  body: PropTypes.string,
  /**
   * @desc Renders content between panel body and panel button
   * @type function
   */
  renderAdditionalInfo: PropTypes.function,
  /**
   * @desc Callback on panel button click. Button appears only if this one is passed.
   * @type function
   */
  onButtonClick: PropTypes.function,
  /**
   * @desc Title of panel button.
   * @type function
   */
  buttonTitle: PropTypes.string,
  /**
   * @desc Renders content below panel button.
   * @type function
   */
  renderBottom: PropTypes.function,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

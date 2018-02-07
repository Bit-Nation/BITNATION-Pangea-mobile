import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

/**
 * @desc Component to render a paragraph of body text.
 * @type React.Component
 */
export default class BodyParagraph extends Component {

  render() {
    return (
      <View style={styles.bodyParagraph}>
        <Text style={styles.body}>
          {this.props.text}
        </Text>
      </View>
    );
  }

}

BodyParagraph.propTypes = {
  /**
   * @desc Text to be rendered
   * @type string
   */
  text: PropTypes.string,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles
});

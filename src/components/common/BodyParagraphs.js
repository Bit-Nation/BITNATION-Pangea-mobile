import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import BodyParagraph from './BodyParagraph';

/**
 * @desc Component to render multiple paragraphs of body text.
 * @type React.Component
 */
export default class BodyParagraphs extends Component {

  render() {
    return (
      <View>
        {_.map(this.props.paragraphs, (text, index) => <BodyParagraph text={text} key={index}/>)}
      </View>
    );
  }

}

BodyParagraphs.propTypes = {
  /**
   * @desc Paragraphs to be rendered
   * @type array of strings
   */
  paragraphs: PropTypes.array,
};

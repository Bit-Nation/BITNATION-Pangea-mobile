// @flow

import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';

import BodyParagraph from './BodyParagraph';

type Props = {
  paragraphs: Array<string>,
}

/**
 * @desc Component to render multiple paragraphs of body text.
 * @return {React.Component} A component.
 */
const BodyParagraphs = ({ paragraphs }: Props) => (
  <View>
    {_.map(paragraphs, (text, index) => <BodyParagraph text={text} key={index} />)}
  </View>
);

export default BodyParagraphs;

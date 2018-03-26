// @flow

import React from 'react';
import { Text, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   * @desc Text to render.
   */
  text: string
}

/**
 * @desc Component to render a paragraph of body text.
 * @return {React.Component} A component.
 */
const BodyParagraph = ({ text }: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <View style={styles.bodyParagraph}>
      <Text style={styles.body}>
        {text}
      </Text>
    </View>
  );
};

export default BodyParagraph;

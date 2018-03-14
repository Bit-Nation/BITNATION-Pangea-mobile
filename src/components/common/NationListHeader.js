import React from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   * @desc Title of header
   */
  title: string
}

/**
 * @desc Component for section header in nations list.
 * @return {React.Component} A component.
 */
const NationListHeader = ({ title }: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <View style={styles.sectionListHeaderContainer}>
      <Text style={styles.sectionListHeaderText}>
        {title}
      </Text>
    </View>
  );
};

export default NationListHeader;

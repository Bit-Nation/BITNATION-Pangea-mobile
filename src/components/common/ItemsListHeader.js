import React from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   * @desc Style to be applied on top of default.
   * @type object
   */
  style?: View.propTypes.style,
  /**
   * @desc Title of header
   */
  title: string
}

/**
 * @desc Component for section header in general items list.
 * @return {React.Component} A component.
 */
const ItemsListHeader = ({ title, style }: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <View style={[styles.sectionListHeaderContainer, style]}>
      <Text style={styles.sectionListHeaderText}>
        {title}
      </Text>
    </View>
  );
};

export default ItemsListHeader;

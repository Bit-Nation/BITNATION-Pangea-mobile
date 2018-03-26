// @flow

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';
import AssetsImages from '../../global/AssetsImages';
import Colors from '../../global/colors';

type Props = {
  /**
   * @desc Text to display on item
   * @type string
   */
  text?: string,
  /**
   * @desc Style object for basic text style
   * @type object
   */
  textStyle?: any,
  /**
   * @desc Status of the Nation to display on item
   * @type string
   */
  status?: string,
  /**
   * @desc Id that will be passed in onPress callback.
   * @type string
   */
  id: any,
  /**
   * @desc Callback on press item.
   * @type string
   */
  onPress: (any) => void,
  /**
   * @desc Color Status of the Nation's label to display on item
   * @type string
   */
  statusColor?: string,
}

/**
 * @desc Component that renders nations list item.
 * @return {React.Component} A component.
 */
const NationListItem = ({
  id, textStyle, onPress, text, status, statusColor,
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <View style={styles.sectionListItemContainer}>
      <TouchableOpacity
        testID='Touchable'
        onPress={() => onPress(id)}
        style={styles.sectionListTouchable}
      >
        <Text style={[styles.listItemText, textStyle]} numberOfLines={1}>
          {text}
        </Text>
        <Text style={[styles.listItemTextState, { color: statusColor }]}>
          {status}
        </Text>
        <Image source={AssetsImages.disclosureRowIcon} style={styles.sectionListDisclosure} />
      </TouchableOpacity>
    </View>
  );
};

NationListItem.defaultProps = {
  text: undefined,
  statusColor: Colors.listItemTextState.default,
  textStyle: undefined,
  status: undefined,
  id: null,
  onPress: () => undefined,
};

export default NationListItem;

// @flow

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';
import AssetsImages from '../../global/AssetsImages';

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
   * @desc Additional view to render on the right of the list item.
   * @type string
   */
  AdditionalView: any,
  /**
   * @desc Flag to show/hide disclosure indicator.
   */
  disclosureIconVisible: boolean,
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
   * @desc Flag to enable/disable press on item.
   */
  disabled: boolean,
  /**
   * @desc Style to be applied on top of default.
   * @type object
   */
  style?: any,
}

/**
 * @desc Component that renders common list item.
 * @return {React.Component} A component.
 */
const ListItem = ({
  id, textStyle, onPress, text, AdditionalView, disclosureIconVisible, disabled, style,
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <View style={[styles.sectionListItemContainer, style]}>
      <TouchableOpacity
        testID='Touchable'
        onPress={() => onPress(id)}
        style={styles.sectionListTouchable}
        disabled={disabled}
      >
        <Text style={[styles.listItemText, textStyle]} numberOfLines={1}>
          {text}
        </Text>
        <AdditionalView />
        {
          disclosureIconVisible &&
          <Image source={AssetsImages.disclosureRowIcon} style={styles.sectionListDisclosure} />
        }
      </TouchableOpacity>
    </View>
  );
};

ListItem.defaultProps = {
  text: undefined,
  textStyle: undefined,
  disclosureIconVisible: true,
  id: null,
  onPress: () => undefined,
  disabled: false,
  AdditionalView: () => null,
};

export default ListItem;

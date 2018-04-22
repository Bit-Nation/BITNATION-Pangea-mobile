// @flow

import React from 'react';
import { View, Text, TouchableOpacity, Image, Switch } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';
import AssetsImages from '../../global/AssetsImages';
import i18n from '../../global/i18n';
import type { SettingsItem } from '../../types/Settings';
import Colors from '../../global/colors';

export type AdditionalViewKind =
  {
    type: 'disclosure',
  } |
  {
    type: 'switch',
    value: boolean,
    onValueChange: (boolean) => void,
  };

type Props = {
  /**
   * @desc Id that will be passed in onPress callback.
   * @type string
   */
  id: any,
  /**
   * @desc Text to display on item
   * @type string
   */
  text?: string,
  /**
   * @desc Callback on press item.
   * @type string
   */
  onPress: (any) => void,
  /**
   * @desc Kind of additional view on the right.
   * disclosure - shows disclosure indicator on right side,
   * switch - shows switch control on right side.
   */
  additionalViewKind: AdditionalViewKind,
  /**
   * @desc Style to be applied on top of default.
   */
  style?: any
}

/**
 * @desc Component that renders nations list item.
 * @return {React.Component} A component.
 */
const SettingsListItem = ({
  id, text, onPress, additionalViewKind, style,
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
        disabled={additionalViewKind.type === 'switch'}
      >
        <Text style={styles.listItemText} numberOfLines={1}>
          {text}
        </Text>
        {
          additionalViewKind.type === 'disclosure' &&
          <Image source={AssetsImages.disclosureRowIcon} style={styles.sectionListDisclosure} />
        }
        {
          additionalViewKind.type === 'switch' &&
          <Switch
            style={styles.switchObject}
            onTintColor={Colors.BitnationHighlightColor}
            onValueChange={additionalViewKind.onValueChange}
            value={additionalViewKind.value}
          />
        }
      </TouchableOpacity>
    </View>
  );
};

SettingsListItem.defaultProps = {
  onPress: () => undefined,
  additionalViewKind: { type: 'disclosure' },
  text: '',
  style: undefined,
};

export default SettingsListItem;

// @flow

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../../global/Styles';
import AssetsImages from '../../../global/AssetsImages';
import i18n from '../../../global/i18n';
import type { SettingsItem } from '../../../types/Settings';

type Props = {
  /**
   * @desc Id that will be passed in onPress callback.
   * @type string
   */
  id: SettingsItem,
  /**
   * @desc Callback on press item.
   * @type string
   */
  onPress: (SettingsItem) => void,
}

/**
 * @desc Component that renders nations list item.
 * @return {React.Component} A component.
 */
const SettingsListItem = ({ id, onPress }: Props) => {
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
        <Text style={[styles.listItemText]} numberOfLines={1}>
          {i18n.t(`screens.settings.${id}`)}
        </Text>
        <Image source={AssetsImages.disclosureRowIcon} style={styles.sectionListDisclosure} />
      </TouchableOpacity>
    </View>
  );
};

SettingsListItem.defaultProps = {
  onPress: () => undefined,
};

export default SettingsListItem;

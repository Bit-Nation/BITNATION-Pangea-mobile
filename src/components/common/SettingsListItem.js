// @flow

import React from 'react';
import { View, Switch } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';
import Colors from '../../global/colors';
import ListItem from './ListItem';

export type AdditionalViewKind = {
  type: 'switch',
  value: boolean,
  onValueChange: boolean => void,
} | {
  type: 'none',
};

type Props = {
  /**
   * @desc Id that will be passed in onPress callback.
   * @type string
   */
  id: string,
  /**
   * @desc Text to display on item
   * @type string
   */
  text: string,
  /**
   * @desc Callback on press item.
   * @param Id of item that was pressed.
   */
  onPress: (id: string) => void,
  /**
   * @desc Kind of additional view on the right.
   * disclosure - shows disclosure indicator on right side,
   * switch - shows switch control on right side.
   */
  additionalViewKind: AdditionalViewKind,
  /**
   * @desc Style to be applied on top of default.
   */
  style?: View.propTypes.style,
};

/**
 * @desc Component that renders nations list item.
 * @return {React.Component} A component.
 */
const SettingsListItem = ({
  id,
  text,
  onPress,
  additionalViewKind,
  style,
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <ListItem
      id={id}
      text={text}
      onPress={onPress}
      style={[styles.settingsList, style]}
      disabled={additionalViewKind.type === 'switch'}
      AdditionalView={() => (
        additionalViewKind.type === 'switch' ? (
          <Switch
            testID='switchObject'
            style={styles.switchObject}
            onTintColor={Colors.BitnationHighlightColor}
            onValueChange={additionalViewKind.onValueChange}
            value={additionalViewKind.value}
          />
        ) : null
      )}
      disclosureIconVisible={additionalViewKind.type !== 'switch'}
    />
  );
};

SettingsListItem.defaultProps = {
  onPress: () => undefined,
  additionalViewKind: { type: 'none' },
  text: '',
  style: undefined,
};

export default SettingsListItem;

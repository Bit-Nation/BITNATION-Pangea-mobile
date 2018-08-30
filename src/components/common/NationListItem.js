// @flow

import React from 'react';
import { Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';
import Colors from '../../global/colors';
import ListItem from './ListItem';

type Props = {
  /**
   * @desc Text to display on item
   * @type string
   */
  nationName: string,
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
  id, textStyle, onPress, nationName, status, statusColor,
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <ListItem
      text={nationName}
      textStyle={textStyle}
      id={id}
      onPress={onPress}
      additionalView={() => (
        <Text style={[styles.listItemTextState, { color: statusColor }]}>
          {status}
        </Text>
      )}
    />
  );
};

NationListItem.defaultProps = {
  statusColor: Colors.listItemTextState.default,
  textStyle: undefined,
  status: undefined,
  id: null,
  onPress: () => undefined,
};

export default NationListItem;

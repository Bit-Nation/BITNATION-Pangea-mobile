// @flow

import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import GlobalStyles from '../../global/Styles';
import AssetsImages from '../../global/AssetsImages';

type Props<IDType> = {
  /**
   * @desc Text to display on item
   * @type string
   */
  text?: string,
  /**
   * @desc Style object for basic text style
   * @type object
   */
  textStyle?: Text.propTypes.style,
  /**
   * @desc Text to show under main text.
   */
  subtitle?: string | null,
  /**
   * @desc Additional view to render on the right of the list item.
   * @type string
   */
  AdditionalView: React.ComponentType<any>,
  /**
   * @desc Additional view to render on the left of the list item.
   * @type string
   */
  AdditionalLeftView: React.ComponentType<any>,
  /**
   * @desc Flag to show/hide disclosure indicator.
   */
  disclosureIconVisible: boolean,
  /**
   * @desc Id that will be passed in onPress callback.
   * @type IDType
   */
  id: IDType,
  /**
   * @desc Callback on press item.
   * @param {IDType} id Id of item that was pressed
   */
  onPress: (id: IDType) => any,
  /**
   * @desc Flag to enable/disable press on item.
   */
  disabled: boolean,
  /**
   * @desc Style to be applied on top of default.
   * @type object
   */
  style?: View.propTypes.style,
  /**
   * @desc Icon base64 image to be displayed on the left
   */
  iconSource?: Image.propTypes.source,
  /**
   * @desc Value of the Document List Item.
   */
  value?: string,
};

/**
 * @desc Component that renders common list item.
 * @return {React.Component} A component.
 */
// eslint-disable-next-line arrow-parens
const ListItem = <IDType>({
  id,
  textStyle,
  onPress,
  text,
  value,
  AdditionalView,
  AdditionalLeftView,
  disclosureIconVisible,
  disabled,
  style,
  iconSource,
  subtitle,
}: Props<IDType>) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  const title = (
    <Text style={[styles.listItemText, textStyle]} numberOfLines={1}>
      {text}
    </Text>
  );

  return (
    <View
      style={[
        styles.sectionListItemContainer,
        subtitle != null ? styles.itemWithSubtitle : null,
        style,
      ]}
    >
      <TouchableOpacity
        testID='Touchable'
        onPress={() => onPress(id)}
        style={styles.sectionListTouchable}
        disabled={disabled}
      >
        <AdditionalLeftView />
        {iconSource != null && (
          <Image source={iconSource} style={styles.listItemIcon} />
        )}
        {subtitle == null ? (
          title
        ) : (
          <View style={styles.listItemTextContainer}>
            {title}
            <Text style={styles.listItemSubtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
        )}
        <AdditionalView />
        {disclosureIconVisible && (
          <Image
            source={AssetsImages.disclosureRowIcon}
            style={styles.sectionListDisclosure}
          />
        )}
        {value && <Text>{value}</Text>}
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
  AdditionalLeftView: () => null,
  iconSource: undefined,
  subtitle: undefined,
  value: undefined,
};

export default ListItem;

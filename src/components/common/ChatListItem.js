// @flow

/**
 * @desc Component that renders chat list item.
 * @type React.Component
 */

import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import moment from 'moment';

import GlobalStyles from '../../global/Styles';
import AssetsImages from '../../global/AssetsImages';

type Props = {
  /**
   * @desc Name of chat partner.
   */
  name: string,
  /**
   * @desc Last message to show on preview.
   */
  lastMessage?: string | null,
  /**
   * @desc Base64 avatar of partner.
   */
  avatar: Image.propTypes.source,
  /**
   * @desc Id that will be passed in onPress callback.
   */
  id: number,
  /**
   * @desc Callback on press item.
   * @param Id of item that was pressed.
   */
  onPress: (id: number) => void,
  /**
   * @desc unreadMessages indicator for new messages in Chat
   */
  unreadMessages: boolean,
  dateString?: any,
};

type PropsList<IDType> = {
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
  dateString: any,
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
  AdditionalView,
  AdditionalLeftView,
  dateString,
  disabled,
  style,
  iconSource,
  subtitle,
}: PropsList<IDType>) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  const title = (
    <Text style={[styles.listItemText, textStyle]} numberOfLines={1}>
      {text}
    </Text>
  );

  const date = dateString ? moment.utc(dateString).format('MM/DD/YYYY') : null;
  const time = dateString ? moment.utc(dateString).format('hh:mm') : null;
  return (
    <View
      style={[
        styles.chatSectionListItemContainer,
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
        <View style={styles.chatListItemContainer}>
          {iconSource != null && (
            <ImageBackground
              source={iconSource}
              style={styles.chatListItemIcon}
            />
          )}
          <AdditionalLeftView />
          {date && time && (
            <View style={styles.chatListItemTextContainer}>
              <Text style={styles.chatListItemSubtitle} numberOfLines={1}>
                {date}
              </Text>
              <Text style={styles.chatListItemSubtitle} numberOfLines={1}>
                {time}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.listItemTextContainer}>
          {title}
          <Text style={styles.listItemSubtitle} numberOfLines={1}>
            {subtitle || 'Start you first chat'}
          </Text>
        </View>

        <AdditionalView />
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

const ChatListItem = ({
  name,
  id,
  onPress,
  avatar,
  lastMessage,
  unreadMessages,
  dateString,
}: Props) => (
  <ListItem
    dateString={dateString}
    id={id}
    text={name}
    textStyle={GlobalStyles.detailedItemTitle}
    onPress={onPress}
    iconSource={avatar}
    style={GlobalStyles.chatDetailedItemContainer}
    subtitle={lastMessage}
    AdditionalLeftView={() =>
      unreadMessages && (
        <View style={GlobalStyles.chatSectionListNewMessage}>
          <Text style={GlobalStyles.chatSectionListNewText}>!</Text>
        </View>
      )
    }
  />
);

ChatListItem.defaultProps = {
  name: '',
  onPress: () => null,
  avatar: null,
  lastMessage: undefined,
};

export default ChatListItem;

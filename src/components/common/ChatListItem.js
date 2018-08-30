// @flow

/**
 * @desc Component that renders chat list item.
 * @type React.Component
 */

import React from 'react';

import ListItem from './ListItem';

type Props = {
  /**
  * @desc Name of chat partner.
  */
  name: string,
  /**
   * @desc Base64 avatar of partner.
   */
  avatar: any,
  /**
   * @desc Id that will be passed in onPress callback.
   */
  id: any,
  /**
   * @desc Callback on press item.
   */
  onPress: (any) => void,
}

const ChatListItem = ({
  name, id, onPress, avatar,
}: Props) => (
  <ListItem
    id={id}
    text={name}
    onPress={onPress}
    iconSource={avatar}
  />
);

ChatListItem.defaultProps = {
  partnerName: '',
  id: null,
  onPress: () => null,
  partnerAvatar: null,
};

export default ChatListItem;

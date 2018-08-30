// @flow

/**
 * @desc Component that renders chat list item.
 * @type React.Component
 */

import React from 'react';
import { Image } from 'react-native';

import ListItem from './ListItem';
import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   * @desc Name of the document.
   */
  name: string,
  /**
   * @desc Description of the document.
   */
  description: string,
  /**
   * @desc Base64 avatar of partner.
   */
  preview: Image.propTypes.source,
  /**
   * @desc Id that will be passed in onPress callback.
   */
  id: string,
  /**
   * @desc Callback on press item.
   * @param Id of item that was pressed.
   */
  onPress: (id: string) => void,
}

const DocumentListItem = ({
  name, id, onPress, preview, description,
}: Props) => (
  <ListItem
    id={id}
    text={name}
    textStyle={GlobalStyles.detailedItemTitle}
    onPress={onPress}
    iconSource={preview}
    style={GlobalStyles.detailedItemContainer}
    subtitle={description}
  />
);

DocumentListItem.defaultProps = {
  name: '',
  onPress: () => null,
  description: '',
  preview: undefined,
};

export default DocumentListItem;

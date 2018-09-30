// @flow

/**
 * @desc Component that renders document details.
 * @type React.Component
 */

import React from 'react';
import { Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ListItem from './ListItem';
import GlobalStyles from '../../global/Styles';

type Props = {
  /**
   * @desc Name of the document.
   */
  name: string,
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
   * @desc Value of the Document List Item.
   */
  documentListValue?: string,
  /**
   * @desc Flag to show/hide disclosure indicator.
   */
  disclosureIconVisible?: boolean,
};

const DocumentDetail = ({
  name,
  id,
  onPress,
  documentListValue,
  disclosureIconVisible,
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });
  return (
    <ListItem
      id={id}
      text={name}
      textStyle={GlobalStyles.detailedItemTitle}
      onPress={onPress}
      AdditionalView={() => (
        <Text style={[styles.listItemTextState]}>
          {documentListValue}
        </Text>
      )}
      disclosureIconVisible={disclosureIconVisible}
      style={GlobalStyles.detailedItemContainer}
    />
  );
};

DocumentDetail.defaultProps = {
  name: '',
  onPress: () => null,
  description: '',
  preview: undefined,
};

export default DocumentDetail;

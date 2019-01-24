// @flow

import React from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import ProgressiveImage from '../../../../components/ProgressiveImage';
import ViewMoreText from '../../../../components/ViewMoreText';
import GovMarketItem from '../GovMarketItem';

import styles from './styles';

type Props = {
  /**
   * @desc Object save item info
   */
  selectedItem: any,
  /**
   * @desc Title of button
   */
  buttonTitle: string,
  /**
   * @desc SubTitle of table
   */
  subTitleTable: string,
  /**
   * @desc Function press item
   */
  onPressItem: (item: any) => {},
  /**
   * @desc Function press main button tab
   */
  onPressMainButton: (obj: any) => {},
  /**
   * @desc Function map element
   */
  onRef: () => {},
  /**
   * @desc Url of Image
   */
  uri: string,
  /**
   * @desc Description to be displayed
   */
  description: string,
  /**
   * @desc Title of tab
   */
  title: string,
  /**
   * @desc subTitle of tab
   */
  subTitle: string,
  /**
   * @desc list similar
   */
  list: Array<any>
};

/**
 * @desc Component for rendering wallet details.
 * @return {React.Component} A component.
 */

const SubTabComponent = ({
  selectedItem: {
    uri, description, subTitle, title,
  }, buttonTitle, subTitleTable, list, onPressItem, onRef, onPressMainButton,
}: Props) => (
  <ScrollView style={styles.container} ref={onRef}>
    <View style={styles.card}>
      <ProgressiveImage
        style={styles.headerBackground}
        source={{ uri }}
      />
    </View>
    <View style={styles.infoView}>
      <Text style={styles.descriptionStyle}>{description}</Text>
      <ScrollView>
        <ViewMoreText
          numberOfLines={3}
        >
          <Text style={styles.readMoreText}>
            Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos. Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos. Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.
          </Text>
        </ViewMoreText>
      </ScrollView>
    </View>
    <TouchableOpacity
      style={styles.titleView}
      onPress={() => onPressMainButton({
        uri, description, subTitle, title,
      })}
    >
      <Text style={styles.titleText}>{buttonTitle}</Text>
    </TouchableOpacity>
    <View style={styles.subTitleView}>
      <Text style={styles.subTitleText}>{subTitleTable}</Text>
    </View>
    <FlatList
      data={list}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      keyExtractor={(item, i) => String(i)}
      showsVerticalScrollIndicator={false}
      renderItem={
        ({ item }) =>
          (<GovMarketItem {...item} onPress={() => { onPressItem(item); }} />)
      }
    />
  </ScrollView>
);

export default SubTabComponent;

SubTabComponent.defaultProps = {
  uri: '',
  description: '',
  title: '',
  subTitle: '',
  list: [],
};

// @flow

import React from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import ProgressiveImage from '../../../../components/ProgressiveImage';
import ViewMoreText from '../../../../components/ViewMoreText';
import GovMarketItem from '../GovMarketItem';

import styles from './styles';

type Props = {
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
  uri, description, title, subTitle, list,
}: Props) => (
  <ScrollView style={styles.container}>
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
    <View style={styles.titleView}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
    <View style={styles.subTitleView}>
      <Text style={styles.subTitleText}>{subTitle}</Text>
    </View>
    <FlatList
      data={list}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      keyExtractor={(item, i) => String(i)}
      showsVerticalScrollIndicator={false}
      renderItem={
        ({ item }) =>
          (<GovMarketItem {...item} />)
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

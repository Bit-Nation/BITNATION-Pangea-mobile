// @flow

import React from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import ProgressiveImage from '../../../components/ProgressiveImage';
import ViewMoreText from '../../../components/ViewMoreText';
import GovMarketItem, { type GovMarketItemProps } from '../GovMarketItem';

import styles from './styles';

type Props = {
  /**
   * @desc GovMarketItem
   */
  selectedItem: GovMarketItemProps,
  /**
   * @desc Description to be displayed
   */
  description: string,
  /**
   * @desc buttonTitle of tab
   */
  buttonTitle: string,
  /**
   * @desc subTitleTable of tab
   */
  subTitleTable: string,
  /**
   * @desc image source of tab
   */
  imageProfile: string,
  /**
   * @desc list similar
   */
  list: Array<any>,

  onPressItem: Function,
  onPressMainButton: Function,
  onRef: Object,
  children: Object
};

/**
 * @desc Component for rendering wallet details.
 * @return {React.Component} A component.
 */

const SubTabComponent = ({
  selectedItem: { uri, description, subTitle, title },
  buttonTitle,
  subTitleTable,
  list,
  onPressItem,
  onRef,
  onPressMainButton,
  children,
  imageProfile
}: Props) => (
  <ScrollView style={styles.container} ref={onRef}>
    {children}
    <View style={styles.card}>
      <ProgressiveImage style={styles.headerBackground} source={imageProfile} />
    </View>
    <View style={styles.infoView}>
      <Text style={styles.descriptionStyle}>{description}</Text>
      <ScrollView>
        <ViewMoreText numberOfLines={3}>
          <Text style={styles.readMoreText}>
            With the BITNATION Public Notary DApp you can notarize important
            contracts, documents, certificates and more in a few seconds. Simply
            upload a photo of the document, or take a photo with your cell phone
            camera of the document you wish to notarize, and click “submit”. The
            hash of the document will be stored on the Ethereum chain forever.
            The first version of our Public Notary was created in 2015 in
            partnership with the Estonia e-Residency program, on the Horizon
            chain. This is a simplified version, migrated onto the Ethereum
            chain. Planned DApp functionalities to be added in future releases
            includes document signing and storage. Producer: BITNATION Americas
            LTD | Year 2018 | Audited: No | Cost: Standard Ethereum tx fees
          </Text>
        </ViewMoreText>
      </ScrollView>
    </View>
    <TouchableOpacity
      style={styles.titleView}
      onPress={() =>
        onPressMainButton({
          uri,
          description,
          subTitle,
          title
        })
      }
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
      renderItem={({ item }) => (
        <GovMarketItem
          {...item}
          onPress={() => {
            onPressItem(item);
          }}
        />
      )}
    />
  </ScrollView>
);

export default SubTabComponent;

SubTabComponent.defaultProps = {
  uri: "",
  description: "",
  title: "",
  subTitle: "",
  list: []
};

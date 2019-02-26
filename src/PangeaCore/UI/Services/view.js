// @flow

import React from 'react';
import { View, TextInput, Image } from 'react-native';
import Background from 'pangea-common-reactnative/UI/BackgroundImage';
import ScrollTabView, { DefaultTabBar } from '../components/ScrollTabView';
import type { Navigator } from '../../types/ReactNativeNavigation';
import ContractScreen from './subTabs/ContractScreen';
import DappScreen from './subTabs/DappScreen';
import ServiceScreen from './subTabs/ServiceScreen';
import ProductScreen from './subTabs/ProductScreen';


import Colors from 'pangea-common-reactnative/styles/colors';
import AssetsImages from 'pangea-common-reactnative/assets/AssetsImages';
import styles from './styles';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import LucyButton from 'pangea-common-reactnative/UI/LucyButton';
import PopOverModal from '../components/PopOverModal';
import { contractData, dAppData, serviceData, productData } from './helper';


const LUCY_MODAL_KEY = 'lucyModal';

type Props ={
  showModal:boolean,
  setShowModal:Function,
  setIsShowWebViewModal:Function,

  onPressHelp:Function,
  children:Object,
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
}

const ServicesScreen = ({
  showModal, setShowModal, onPressHelp, children, setIsShowWebViewModal, navigator,
}:Props) => (
  <View style={styles.screenContainer}>
    {children}
    <Background />
    <FakeNavigationBar />
    <View style={styles.bodyContainer}>
      <View style={styles.searchBarContainer}>
        <View style={styles.inputViewContainer}>
          <TextInput
            style={styles.textInputStyle}
            placeholder='Search by name, type or category...'
            placeholderTextColor={Colors.BitnationLinkOrangeColor}
            autoCapitalize='none'
          />
          <Image source={AssetsImages.searchIcon} style={styles.searchIconStyle} />
        </View>
      </View>
      <ScrollTabView
        initialPage={0}
        tabBarBackgroundColor={Colors.BitnationBlackAlphaColor}
        tabBarActiveTextColor={Colors.BitnationLinkOrangeColor}
        tabBarInactiveTextColor={Colors.BitnationLinkOrangeColor}
        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
        tabBarTextStyle={styles.tabBarTextStyle}
        renderTabBar={() => <DefaultTabBar />}
      >
        <View tabLabel='DAPPS'>
          <DappScreen
            navigator={navigator}
            buttonTitle='USE DAPP'
            subTitleTable='SIMILAR DAPPS'
            list={dAppData}
          />
        </View>
        <View tabLabel='CONTRACTS'>
          <ContractScreen

            buttonTitle='COPY CONTRACT CODE'
            subTitleTable='SIMILAR CONTRACTS'
            list={contractData}
          />
        </View>
        <View tabLabel='SERVICES'>
          <ServiceScreen

            buttonTitle='USE SERVICE'
            subTitleTable='SIMILAR SERVICES'
            list={serviceData}
          />
        </View>
        <View tabLabel='PRODUCTS'>
          <ProductScreen

            buttonTitle='USE PRODUCT'
            subTitleTable='SIMILAR PRODUCTS'
            list={productData}
          />
        </View>
      </ScrollTabView>
    </View>
    <LucyButton onPress={() => setShowModal(LUCY_MODAL_KEY)} />
    <PopOverModal
      visible={showModal === LUCY_MODAL_KEY}
      onCancel={() => setShowModal('')}
      desText='Tailor make your own governance system through choosing dapps, contracts, services and products!'
      options={[
      {
        text: 'Start a new Service',
        onPress: () => {
          setShowModal('');
          setIsShowWebViewModal(true);
        },
      },
      {
        text: 'Report a Service',
        onPress: () => {},
      },
      {
        text: 'Help',
        onPress: onPressHelp,
      },
    ]}
    />
  </View>
);
export default ServicesScreen;

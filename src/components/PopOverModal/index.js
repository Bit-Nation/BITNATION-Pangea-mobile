// @flow

import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  Text,
} from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import LucyButton from '../common/LucyButton';

import Colors from '../../global/colors';
import GlobalStyles from '../../global/Styles';

import { getTabBarHeight } from '../../utils/normalizer';

const { height } = Dimensions.get('window');
const modalWrapContentHeight = height - (GlobalStyles.statusBar.height + 18 + getTabBarHeight() + 80);

type MenuOption = {
    text: string,
    onPress: () => any,
}

type Props = {
    /**
     * @desc Function to cancel the menu
     */
    onCancel: () => void,
    /**
     * @desc Modal visibility
     */
    visible: boolean,
    /**
     * @desc Array of available options on menu.
     */
    options: Array<MenuOption>,
    /**
     * @desc Text description
     */
    desText?: string,
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  lucyButtonStyle: {
    bottom: getTabBarHeight() + 20,
  },
  modalMoreContainer: {
    flex: 1,
    backgroundColor: Colors.lightFade,
    paddingHorizontal: 10,
    paddingTop: GlobalStyles.statusBar.height + 8,
  },
  modalWrapContent: {
    backgroundColor: Colors.Transparent,
    width: '100%',
    height: modalWrapContentHeight,
  },
  modalContent: {
    width: '100%',
    height: '95%',
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: modalWrapContentHeight * 0.05,
    borderTopWidth: 30,
    borderRightColor: 'transparent',
    borderTopColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    right: 40,
    transform: [
      { rotate: '90deg' },
    ],
  },
  headerView: {
    backgroundColor: Colors.BitnationLinkOrangeColor,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerText: {
    color: Colors.white,
    fontSize: 25,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.BitnationBlackAlphaColor,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  modalMenuItem: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BitnationLinkOrangeColor,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  modalMenuBackItem: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BitnationLinkOrangeColor,
    borderRadius: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  modalMenuText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

const PopOverModal = ({
  onCancel,
  visible,
  desText,
  options,
}: Props) => (
  <Modal
    animationType='fade'
    transparent
    visible={visible}
    onRequestClose={onCancel}
  >
    <TouchableOpacity style={styles.modalMoreContainer} activeOpacity={1} onPress={onCancel}>
      <TouchableOpacity style={styles.modalWrapContent} activeOpacity={1}>
        <View style={styles.modalContent}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>LUCY</Text>
          </View>
          {desText && <Text style={styles.descriptionText}>{desText}</Text>}
          {
            options.map(option => (
              <TouchableOpacity
                style={styles.modalMenuItem}
                onPress={option.onPress}
                key={option.text}
              >
                <Text style={styles.modalMenuText}>{option.text}</Text>
              </TouchableOpacity>
            ))
          }
          <TouchableOpacity
            style={styles.modalMenuBackItem}
            onPress={onCancel}
          >
            <Text style={styles.modalMenuText}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.triangle} />
      </TouchableOpacity>
      <LucyButton style={styles.lucyButtonStyle} onPress={onCancel} />
    </TouchableOpacity>
  </Modal>
);

PopOverModal.defaultProps = {
  onCancel: () => { },
  visible: false,
  options: [],
};

export default PopOverModal;

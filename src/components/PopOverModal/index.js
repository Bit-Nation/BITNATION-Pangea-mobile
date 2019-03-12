// @flow

import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import LucyButton from '../common/LucyButton';

import AssetsImages from '../../global/AssetsImages';
import Colors from '../../global/colors';
import GlobalStyles from '../../global/Styles';

import { getTabBarHeight } from '../../utils/normalizer';
import colors from '../../global/colors';

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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modalWrapContent: {
    backgroundColor: Colors.Transparent,
    width: '100%',
    height: modalWrapContentHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '75%',
    height: '75%',
    backgroundColor: Colors.white,
    opacity: 0.85,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // triangle: {
  //   width: 0,
  //   height: 0,
  //   backgroundColor: 'transparent',
  //   borderStyle: 'solid',
  //   // borderRightWidth: modalWrapContentHeight * 0.05,
  //   borderTopWidth: 30,
  //   borderRightColor: 'transparent',
  //   borderTopColor: Colors.white,
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 40,
  //   transform: [
  //     { rotate: '90deg' },
  //   ],
  // },
  headerView: {
    backgroundColor: Colors.BitnationLinkOrangeColor,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  headerText: {
    color: Colors.BitnationDarkGrayColor,
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalBackground: {
    width: '100%',
    height: '100%',
  },
  contentViewModal: {
    flex: 1,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.BitnationDarkGrayColor,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    marginHorizontal: 40,
  },
  modalMenuItem: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 10,
    borderBottomColor: Colors.white,
  },
  modalMenuBackItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 120,
  },
  lucyCloseIcon: {
    width: '100%',
    height: '100%',
  },
  modalMenuText: {
    fontSize: 16,
    color: Colors.BitnationActionColor,
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
    animationType='slide'
    transparent
    visible={visible}
    onRequestClose={onCancel}
  >
    <TouchableOpacity style={styles.modalMoreContainer} activeOpacity={1} onPress={onCancel}>
      <TouchableOpacity style={styles.modalWrapContent} activeOpacity={1}>
        <View style={styles.modalContent}>
          <View style={styles.contentViewModal}>
            {desText && <Text style={styles.descriptionText}>{desText}</Text>}

            {
                  options.map((option, index) => (
                    <TouchableOpacity
                      style={[styles.modalMenuItem, { borderBottomWidth: index === options.length - 1 ? 0 : 3 }]}
                      onPress={() => {
                        // onCancel();
                        setTimeout(() => {
                          option.onPress();
                        }, 200);
                      }}
                      key={option.text}
                    >
                      <Text style={styles.modalMenuText}>{option.text}</Text>
                    </TouchableOpacity>
                  ))
                }
            {/* <TouchableOpacity
                style={styles.modalMenuBackItem}
                onPress={onCancel}
              >
                <Image source={AssetsImages.lucyModalClose} style={styles.lucyCloseIcon} />
              </TouchableOpacity> */}
          </View>
        </View>
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

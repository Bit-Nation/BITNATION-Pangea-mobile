// @flow

import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
} from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import Colors from '../../global/colors';
import GlobalStyles from '../../global/Styles';

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
};

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,

  modalMoreContainer: {
    flex: 1,
    backgroundColor: Colors.lightFade,
    paddingLeft: 100,
    paddingRight: 8,
    paddingTop: GlobalStyles.statusBar.height + 8,
  },
  modalMoreContent: {
    backgroundColor: 'white',
  },
  modalMenuItem: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalMenuText: {
    paddingLeft: 15,
    fontSize: 16,
    color: Colors.BitnationBlackAlphaColor,
  },
});

const MoreMenuModal = ({
  onCancel,
  visible,
  options,
}: Props) => (
  <Modal
    animationType='fade'
    transparent
    visible={visible}
    onRequestClose={onCancel}
  >
    <TouchableOpacity style={styles.modalMoreContainer} activeOpacity={1} onPress={onCancel}>
      <View style={styles.modalMoreContent}>
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
      </View>
    </TouchableOpacity>
  </Modal>
);

export default MoreMenuModal;

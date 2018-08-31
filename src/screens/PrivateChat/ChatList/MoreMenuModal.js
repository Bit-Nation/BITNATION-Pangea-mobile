// @flow

import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Text } from 'native-base';
import styles from './styles';
import i18n from '../../../global/i18n';

type Props = {
  /**
   * @desc Function to cancel the menu
   */
  onCancel: () => void,
  /**
   * @desc Function to share public key
   */
  onShareKey: () => Promise<void>,
  /**
   * @desc Modal visibility
   */
  visible: boolean
};


const MoreMenuModal = ({
  onCancel,
  onShareKey,
  visible,
}: Props) => (
  <Modal
    animationType='fade'
    transparent
    visible={visible}
    onRequestClose={onCancel}
  >
    <TouchableOpacity style={styles.modalMoreContainer} activeOpacity={1} onPress={onCancel}>
      <View style={styles.modalMoreContent}>
        <TouchableOpacity
          style={styles.modalMenuItem}
          onPress={onShareKey}
        >
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.shareIdentityKey')}</Text>
        </TouchableOpacity>
        {/*
        <View style={styles.modalMenuItem}>
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.markAllRead')}</Text>
        </View>
        <View style={[styles.modalMenuItem]}>
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.filterChatList')}</Text>
        </View>
        <View style={styles.modalMenuItem}>
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.managerChatSections')}</Text>
          <IconIonic
            name='ios-arrow-forward'
            style={styles.iconForward}
          />
        </View>
        <View style={[styles.modalMenuItem]}>
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.restoreChat')}</Text>
          <IconIonic
            name='ios-arrow-forward'
            style={styles.iconForward}
          />
        </View>
        <View style={styles.modalMenuItem}>
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.settings')}</Text>
          <IconIonic
            name='ios-arrow-forward'
            style={styles.iconForward}
          />
        </View>
        */}
      </View>
    </TouchableOpacity>
  </Modal>
);

export default MoreMenuModal;

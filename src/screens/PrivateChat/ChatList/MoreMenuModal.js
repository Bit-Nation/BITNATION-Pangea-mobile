// @flow

import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { Text } from 'native-base';
import styles from './styles';
import i18n from '../../../global/i18n';

type Props = {
  onCancel: () => void,
  /**
   * @desc Modal visibility
   */
  visible: boolean
};


const MoreMenuModal = ({
  onCancel, visible,
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
          activeOpacity={0.8}
          onPress={this.sharePublicKey}
        >
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.shareIdentityKey')}</Text>
          <IconIonic
            name='ios-arrow-forward'
            style={styles.iconForward}
          />
        </TouchableOpacity>
        {/*
        <View style={styles.modalMenuItem}>
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.markAllRead')}</Text>
        </View>
        <View style={[styles.modalMenuItem, styles.modalMenuItemBorderBottom]}>
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.filterChatList')}</Text>
        </View>
        <View style={styles.modalMenuItem}>
          <Text style={styles.modalMenuText}>{i18n.t('screens.chat.menu.managerChatSections')}</Text>
          <IconIonic
            name='ios-arrow-forward'
            style={styles.iconForward}
          />
        </View>
        <View style={[styles.modalMenuItem, styles.modalMenuItemBorderBottom]}>
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

// TODO add FLOW

import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { Text } from 'native-base';
import styles from './styles';

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
        <TouchableOpacity style={styles.modalMenuItem} activeOpacity={0.8}>
          <Text style={styles.modalMenuText}>Filter Chat List</Text>
          <IconIonic
            name='ios-arrow-forward'
            style={styles.iconForward}
          />
        </TouchableOpacity>
        <View style={styles.modalMenuItem}>
          <Text style={styles.modalMenuText}>Mark all as read</Text>
        </View>
        <View style={[styles.modalMenuItem, styles.modalMenuItemBorderBottom]}>
          <Text style={styles.modalMenuText}>Share my Identity Key</Text>
        </View>
        <View style={styles.modalMenuItem}>
          <Text style={styles.modalMenuText}>Manager Chat Sections</Text>
          <IconIonic
            name='ios-arrow-forward'
            style={styles.iconForward}
          />
        </View>
        <View style={[styles.modalMenuItem, styles.modalMenuItemBorderBottom]}>
          <Text style={styles.modalMenuText}>Restore Chat</Text>
          <IconIonic
            name='ios-arrow-forward'
            style={styles.iconForward}
          />
        </View>
        <View style={styles.modalMenuItem}>
          <Text style={styles.modalMenuText}>Setting</Text>
          <IconIonic
            name='ios-arrow-forward'
            style={styles.iconForward}
          />
        </View>
      </View>
    </TouchableOpacity>
  </Modal>
);

export default MoreMenuModal;

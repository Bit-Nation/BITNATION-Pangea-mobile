// @flow

import React from 'react';
import {
  View,
  Modal,
  Image,
} from 'react-native';
import { Text } from 'native-base';

import Button from '../../../components/common/Button';
import styles from './styles';
import i18n from '../../../global/i18n';

type Props = {
  /**
   * @desc Function to close the modal
   */
  done: () => void,
  /**
   * @desc Modal visibility
   */
  visible: boolean
};

const InviteSentModal = ({
  done, visible,
}: Props) => (
  <Modal
    animationType='slide'
    transparent
    visible={visible}
  >
    <View style={styles.modalContainer}>
      <View style={[styles.modalContent, styles.inviteSuccessModal]}>
        <View style={styles.profileArea}>
          <Text style={styles.modalTitle}>{i18n.t('screens.chat.inviteSent')}</Text>
          <Text style={styles.modalBody}>
            You have invited Sandy Apples to chat.
          </Text>
        </View>
        <View style={styles.buttonArea}>
          <Button
            enabled
            styleTitle={styles.newAccountText}
            title={i18n.t('common.ok').toUpperCase()}
            onPress={done}
          />
        </View>
      </View>
    </View>
  </Modal>
);

export default InviteSentModal;

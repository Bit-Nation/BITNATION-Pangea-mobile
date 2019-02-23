// @flow

import React from 'react';
import {
  View,
  Modal,
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

const InvalidKeyModal = ({
  done, visible,
}: Props) => (
  <Modal
    animationType='fade'
    transparent
    visible={visible}
    onRequestClose={done}
  >
    <View style={styles.modalContainer}>
      <View style={[styles.modalContent, styles.invalidKeyModal]}>
        <View style={styles.profileArea}>
          <Text style={styles.modalTitle}>{i18n.t('screens.chat.invalidKey')}</Text>
          <Text style={styles.modalBody}>
            Your clipboard does not have a valid public key on it.{'\n'}{'\n'}
            Ask the person you want to chat with to share their Identity Key with you. They can find their Identity Key in the app identity setting, or in the menu on the chat screen.{'\n'}{'\n'}
            Copy the key they send you and return here.
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

export default InvalidKeyModal;

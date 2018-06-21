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

const InvalidKeyModal = ({
  done, visible,
}: Props) => (
  <Modal
    animationType='slide'
    transparent
    visible={visible}
  >
    <View style={styles.modalContainer}>
      <View style={[styles.modalContent, styles.invalidKeyModal]}>
        <View style={styles.profileArea}>
          <Text style={styles.modalTitle}>{i18n.t('screens.chat.invalidKey')}</Text>
          <Text style={styles.modalBody}>
            Your clipboard does not have a valid public key on it.{'\n'}{'\n'}
            1. Close this app{'\n'}
            2. Copy a public key to the clipboard{'\n'}
            3. Return to this screen{'\n'}{'\n'}
            Once you enter the public key, this app will send them an invitation to chat.
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

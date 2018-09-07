// @flow

import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Text, CheckBox } from 'native-base';
import type { AccountType as DBAccount } from '../../../services/database/schemata';

import Button from '../../../components/common/Button';
import styles from './styles';
import i18n from '../../../global/i18n';

type Props = {
  /**
   * @desc Function to close the modal
   */
  done: () => void,
  /**
   * @desc Function to close the modal
   */
  onDismiss: () => void,
  /**
   * @desc Function to select account
   * @param {number} Account index
   */
  onSelectAccount: (index : number) => void,
  /**
   * @desc Modal visibility
   */
  visible: boolean,
  /**
   * @desc List account duplicate
   */
  accountsMigration: Array<DBAccount>,
  /**
   * @desc  Selected account index
   */
  selectedAccountIndex: number,
};

const DuplicateAccountsModal = ({
  done, visible, accountsMigration, selectedAccountIndex, onSelectAccount, onDismiss,
}: Props) => (
  <Modal
    animationType='none'
    transparent
    visible={visible}
    onRequestClose={done}
    onDismiss={onDismiss}
  >
    <View style={styles.modalContainer}>
      <View style={[styles.modalContent, styles.duplicateModal]}>
        <View style={styles.profileArea}>
          <Text style={styles.modalTitle}>Merge Duplicate Account</Text>
          <Text style={styles.modalBody}>
            This is the list of accounts which are duplicated with your restore account.{'\n'}{'\n'}
            Please select the account you want to use.{'\n'}{'\n'}
            We will delete other duplicate accounts. Thank you!
          </Text>
        </View>
        <View style={styles.listAccountView}>
          <FlatList
            renderItem={(item: { item: DBAccount }) => {
              const account = item.item;
              return (
                <View>
                  <TouchableOpacity
                    style={styles.itemView}
                    activeOpacity={0.9}
                    onPress={() => onSelectAccount(accountsMigration.indexOf(account))}
                  >
                    <View style={styles.leftItem}>
                      <CheckBox
                        onPress={() => onSelectAccount(accountsMigration.indexOf(account))}
                        checked={selectedAccountIndex === accountsMigration.indexOf(account)}
                        color='tomato'
                      />
                    </View>
                    <View style={styles.rightItem}>
                      <Text style={styles.textItem}>{account.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>);
            }}
            ItemSeparatorComponent={() => (<View style={styles.itemSeparator} />)}
            keyExtractor={item => item.id.toString()}
            data={accountsMigration}
          />
        </View>
        <View style={styles.buttonArea}>
          <Button
            enabled={selectedAccountIndex > -1}
            styleTitle={styles.buttonText}
            title={i18n.t('common.ok').toUpperCase()}
            onPress={done}
          />
        </View>
      </View>
    </View>
  </Modal>
);

export default DuplicateAccountsModal;

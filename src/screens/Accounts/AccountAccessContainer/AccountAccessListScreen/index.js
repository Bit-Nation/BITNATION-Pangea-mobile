// @flow

import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import BackgroundImage from '../../../../components/common/BackgroundImage';
import Button from '../../../../components/common/Button';
import styles from './styles';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import ScreenTitle from '../../../../components/common/ScreenTitle';
import NationListItem from '../../../../components/common/NationListItem';
import type { Account } from '../../../../types/Account';
import i18n from '../../../../global/i18n';

type Props = {
  /**
   * @desc Array of accounts to be displayed.
   */
  accounts: Array<Account>,
  /**
   * @desc Function to be called when an item is selected from the list
   * @param id ID of the account to be opened
   */
  onSelectItem: (id: string) => void,
  /**
   * @desc Function to create an account
   */
  onCreateAccount: () => void,
  /**
   * @desc Function to restore an account
   */
  onRestoreAccount: () => void,
};

const AccountAccessListScreen = ({
  accounts, onSelectItem, onRestoreAccount, onCreateAccount,
}: Props) => (
  <View style={styles.profilesScreenContainer}>
    <BackgroundImage />
    <FakeNavigationBar />
    <View style={styles.bodyAccountContainer}>
      <ScreenTitle title={i18n.t('screens.accounts.title')} />
      <FlatList
        renderItem={(item) => {
          const account = item.item;
          return (<NationListItem
            text={account.name}
            participants=''
            itemIcon={0}
            onPress={id => onSelectItem(id)}
            id={account.id}
          />);
        }}
        keyExtractor={item => item.id}
        data={accounts}
        style={styles.sectionList}
      />
      <View style={styles.buttonListContainer}>
        <Button
          enabled
          title={i18n.t('screens.accounts.newAccount')}
          onPress={() => onCreateAccount()}
          style={styles.panelButton}
        />
        <Button
          enabled
          title={i18n.t('screens.accounts.restoreAccount')}
          onPress={() => onRestoreAccount()}
          style={styles.panelButton}
        />
        <View style={styles.spacer} />
      </View>
    </View>
  </View>
);

export default AccountAccessListScreen;

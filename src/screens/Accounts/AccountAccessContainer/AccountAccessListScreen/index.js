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
   * @desc Function to open an account
   * @param id Index of the account selected
   */
  onCreateAccount: () => void,
  /**
   * @desc Function to open an account
   * @param id Index of the account selected
   */
  onResetAccount: () => void,
};

const AccountAccessListScreen = ({
  accounts, onSelectItem, onResetAccount, onCreateAccount,
}: Props) => (
  <View style={styles.nationsScreenContainer}>
    <BackgroundImage />
    <FakeNavigationBar />
    {/* TODO Insert translations */}
    <ScreenTitle title='Accounts' />
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
    <View style={styles.buttonsContainer}>
      <Button
        enabled
        // TODO Insert translations
        title='New Account'
        onPress={() => onCreateAccount()}
        style={styles.submitButton}
      />
      <Button
        enabled
        // TODO Insert translations
        title='Restore Account'
        onPress={() => onResetAccount()}
        style={styles.submitButton}
      />
      <View style={styles.spacer} />
    </View>
  </View>
);

export default AccountAccessListScreen;

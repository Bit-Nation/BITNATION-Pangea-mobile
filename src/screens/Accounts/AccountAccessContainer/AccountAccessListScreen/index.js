// @flow

import React from 'react';
import {
  View,
  SectionList,
} from 'react-native';

import BackgroundImage from '../../../../components/common/BackgroundImage';
import styles from './styles';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import i18n from '../../../../global/i18n';
import type { Account } from '../../../../types/Account';
import ScreenTitle from '../../../../components/common/ScreenTitle';

type Props = {
  /**
   * @desc List of all accounts
   */
  accounts: Array<Account>,
  /**
   * @desc Function to be called when an item is selected from the list
   * @param id ID of the nation to be opened
   * @param isBot Flag to indicate if the selected channel is bot
   */
  onSelectItem: (id: number, isBot: boolean) => void,
};

const AccountAccessListScreen = ({ onSelectItem, accounts }: Props) => {
  return (
    <View style={styles.nationsScreenContainer}>
      <BackgroundImage />
      <FakeNavigationBar />
      <ScreenTitle title={i18n.t('screens.chat.title')} />
      <SectionList
        renderItem={(item) => {
          const nation = item.item;
          return (<ChatListItem
            text={nation.nationName}
            participants=''
            itemIcon={0}
            onPress={id => onSelectItem(id, false)}
            id={nation.id}
          />);
        }}
        keyExtractor={item => item.id}
        style={styles.sectionList}
      />
    </View>
  );
};

export default AccountAccessListScreen;

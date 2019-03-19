// @flow

import React from 'react';
import { View, FlatList, Image, Animated } from 'react-native';
import { Button, Text } from 'native-base';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
// import Button from '../../../../components/common/Button';
import styles from './styles';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';
import ListItem from 'pangea-common-reactnative/UI/ListItem';
import type { Account } from 'pangea-common/types/accounts-types';
import i18n from 'pangea-common/i18n';
import BitnationCover from 'pangea-common-reactnative/assets/images/BitnationCover.png';
import bitnationIntro from 'pangea-common-reactnative/UI/assets/images/bitnationIntro.gif';
import Images from 'pangea-common-reactnative/assets/AssetsImages';

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
  accounts,
  onSelectItem,
  onRestoreAccount,
  onCreateAccount,
}: Props) => (
  <Animated.View style={styles.profilesScreenContainer}>
    <BackgroundImage source={Images.backgroundLogin} />
    {/* <FakeNavigationBar />
    <ScreenTitle title={i18n.t('screens.accounts.title')} /> */}
    <Image source={BitnationCover} style={styles.image} />
    <FlatList
      renderItem={(item) => {
        const account = item.item;
        return (
          <ListItem
            text={account.name}
            textStyle={styles.textStyle}
            onPress={id => onSelectItem(id)}
            id={account.id}
          />
        );
      }}
      keyExtractor={item => item.id}
      data={accounts}
      style={styles.sectionList}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    />
    <View style={styles.buttonListContainer}>
      <Button
        block
        style={styles.restoreAccountButton}
        onPress={onRestoreAccount}
      >
        <Text style={styles.restoreAccountButtonText}>{i18n.t('screens.accounts.restoreAccount').toUpperCase()}</Text>
      </Button>

      <Button
        block
        onPress={onCreateAccount}
        style={styles.newAccountButton}
      >
        <Text style={styles.restoreAccountButtonText}>{i18n.t('screens.accounts.newAccount').toUpperCase()}</Text>
      </Button>
      <View style={styles.spacer} />
    </View>

  </Animated.View>
);

export default AccountAccessListScreen;

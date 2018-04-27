// @flow

import React from 'react';
import {
  View,
  SectionList,
} from 'react-native';

import BackgroundImage from '../../../../components/common/BackgroundImage';
import Button from '../../../../components/common/Button';
import styles from './styles';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import i18n from '../../../../global/i18n';
import ScreenTitle from '../../../../components/common/ScreenTitle';
import NationListItem from '../../../../components/common/NationListItem';

type Props = {
  /**
   * @desc Function to be called when an item is selected from the list
   * @param id ID of the account to be opened
   */
  onSelectItem: (id: number) => void,
};

const AccountAccessListScreen = ({ onSelectItem }: Props) => (
  <View style={styles.nationsScreenContainer}>
    <BackgroundImage />
    <FakeNavigationBar />
    <ScreenTitle title={i18n.t('screens.chat.title')} />
    <SectionList
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
      style={styles.sectionList}
    />
    <View style={styles.buttonsContainer}>
      <Button
        enabled
        // TODO Insert translations
        title='New Account'
        onPress={() => this.props.openAccount(this.props.createAccount)}
        style={styles.submitButton}
      />
      <Button
        enabled
        // TODO Insert translations
        title='Restore Account'
        onPress={() => this.props.openAccount(this.props.resetAccount)}
        style={styles.submitButton}
      />
      <View style={styles.spacer} />
    </View>
  </View>
);

AccountAccessListScreen.defaultProps = {
  onSelectItem: () => null,
};

export default AccountAccessListScreen;

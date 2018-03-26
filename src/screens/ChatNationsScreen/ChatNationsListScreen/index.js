// @flow

import React from 'react';
import {
  View,
  Text, SectionList,
} from 'react-native';
import _ from 'lodash';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import ChatListItem from '../../../components/common/ChatListItem';
import NationListHeader from '../../../components/common/NationListHeader';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';
import AssetsImages from '../../../global/AssetsImages';
import type { NationType } from '../../../types/Nation';

type Props = {
  /**
   * @desc Selected Tab Name
   */
  selectedTab: string,
  /**
   * @desc List of all nations
   */
  nations: Array<NationType>,
  /**
   * @desc List of nations that the current user has joined to.
   */
  myNations: Array<NationType>,
  /**
   * @desc Function to be called when an item is selected from the list
   * @param id ID of the nation to be opened
   * @param isBot Flag to indicate if the selected channel is bot
   */
  onSelectItem: (id: number, isBot: boolean) => void,
};

const ChatNationsListScreen = ({
  selectedTab, nations, myNations, onSelectItem,
}: Props) => {
  const nationsToDisplay = selectedTab === 'ALL_NATIONS' ?
    _.filter(nations, nation => nation.idInSmartContract >= 0)
    :
    _.filter(nations, nation => (
      _.indexOf(myNations, nation.id) !== -1) && (nation.idInSmartContract >= 0));
  const sortedNations = _.sortBy(nationsToDisplay, nation => nation.nationName);
  const groups = _.groupBy(sortedNations, nation => nation.nationName.charAt(0));
  let sections = _.map(groups, (group, key) => ({
    title: key,
    data: group,
  }));
  const bots = [{ title: 'Bots', data: [{ name: 'Dr. FreudBot', isBot: true, id: 0 }] }];
  sections = bots.concat(sections);

  return (
    <View style={styles.nationsScreenContainer}>
      <BackgroundImage />
      <FakeNavigationBar />
      {/* TITLE OF SCREEN */}
      <View style={styles.titleContainer}>
        <View style={styles.titleBarLarge}>
          <Text style={styles.largeTitle}>{i18n.t('screens.chat.title')}</Text>
        </View>
      </View>
      <SectionList
        renderItem={(item) => {
          const nation = item.item;
          if (nation.isBot === true) {
            return (<ChatListItem
              text={nation.name}
              participants=''
              itemIcon={AssetsImages.ChatUI.botIcon}
              onPress={id => onSelectItem(id, true)}
              id={nation.id}
            />);
          }
            return (<ChatListItem
              text={nation.nationName}
              participants=''
              itemIcon={0}
              onPress={id => onSelectItem(id, false)}
              id={nation.id}
            />);
        }}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section }) => <NationListHeader title={section.title} />}
        sections={sections}
        style={styles.sectionList}
      />
    </View>
  );
};

export default ChatNationsListScreen;

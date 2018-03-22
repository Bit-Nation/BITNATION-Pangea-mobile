// @flow

import React, { Component } from 'react';
import {
  View,
  Text, SectionList,
} from 'react-native';
import _ from 'lodash';
import SegmentedControl from 'react-native-segmented-control-tab';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import ChatListItem from '../../../components/common/ChatListItem';
import NationListHeader from '../../../components/common/NationListHeader';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';
import AssetsImages from '../../../global/AssetsImages';
import type { NationType } from '../../../services/database/schemata';

type Props = {
  /**
   * @desc Selected Tab Name
   */
  selectedTab?: string,
  /**
   * @desc List of all nations
   */
  nations?: Array<NationType>,
  /**
   * @desc List of nations that the current user has joined to.
   */
  myNations?: Array<NationType>,
  /**
   * @desc Function to be called when an item is selected from the list
   */
  onSelectItem: (number, boolean) => void,
};

class ChatNationsListScreen extends Component<Props> {
  render() {
    const nations = this.props.selectedTab === 'ALL_NATIONS' ?
      _.filter(this.props.nations, nation => nation.idInSmartContract >= 0)
      :
      _.filter(this.props.nations, nation => (_.indexOf(this.props.myNations, nation.id) !== -1) && (nation.idInSmartContract >= 0));
    const sortedNations = _.sortBy(nations, nation => nation.nationName);
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
                onPress={id => this.props.onSelectItem(id, true)}
                id={nation.id}
              />);
            } else {
              return (<ChatListItem
                text={nation.nationName}
                participants=''
                itemIcon={0}
                onPress={id => this.props.onSelectItem(id, false)}
                id={nation.id}
              />);
            }
          }}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section }) => <NationListHeader title={section.title} />}
          sections={sections}
          style={styles.sectionList}
        />
      </View>
    );
  }
}

export default ChatNationsListScreen;

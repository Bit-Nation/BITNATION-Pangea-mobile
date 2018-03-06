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
import { ALL_NATIONS } from '../../../reducers/nations';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';
import { resolveStatus } from '../../../utils/nations';
import AssetsImages from '../../../global/AssetsImages';

class ChatNationsListScreen extends Component {
  render() {
    const nations = this.props.selectedTab === ALL_NATIONS ?
      this.props.nations
      :
      _.filter(this.props.nations, nation => _.indexOf(this.props.myNations, nation.id) !== -1);
    const sortedNations = _.sortBy(nations, nation => nation.nationName);
    const groups = _.groupBy(sortedNations, nation => nation.nationName.charAt(0));
    const sections = _.map(groups, (group, key) => ({
      title: key,
      data: group,
    }));

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
            const nationStatus = resolveStatus(nation);

            return (<ChatListItem
              text={nation.nationName}
              participants='None'
              itemIcon={AssetsImages.ChatUI.signal0}
              onPress={this.props.onSelectItem}
              status={(nationStatus === null ? '' : i18n.t(`enums.nation.status.${nationStatus.key}`))}
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
  }
}

export default ChatNationsListScreen;

import React, { Component } from 'react';
import {
  View,
  Text, SectionList,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SegmentedControl from 'react-native-segmented-control-tab';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import NationListItem from '../../../components/common/NationListItem';
import NationListHeader from '../../../components/common/NationListHeader';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';
import { resolveStatus, statusColor } from '../../../utils/nations';

class NationsListScreen extends Component {
  render() {
    const nations = this.props.selectedTab === 'ALL_NATIONS' ?
      this.props.nations
      :
      _.filter(this.props.nations, nation => _.indexOf(this.props.myNationIds, nation.id) !== -1);
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
            <Text style={styles.largeTitle}>{i18n.t('screens.nations.title')}</Text>
          </View>
        </View>
        <View style={styles.segmentedControlContainer}>
          <SegmentedControl
            values={[i18n.t('screens.nations.allNations'), i18n.t('screens.nations.myNations')]}
            selectedIndex={this.props.selectedTab === 'ALL_NATIONS' ? 0 : 1}
            onTabPress={this.props.onSelectTab}
            tabsContainerStyle={styles.tabsContainerStyle}
            activeTabStyle={styles.activeTabStyle}
            tabStyle={styles.tabStyle}
            tabTextStyle={styles.tabTextStyle}
          />
        </View>
        <SectionList
          renderItem={(item) => {
            const nation = item.item;
            const nationStatus = resolveStatus(nation);

            return (<NationListItem
              text={nation.nationName}
              onPress={this.props.onSelectItem}
              status={(nationStatus === null ? '' : i18n.t(`enums.nation.status.${nationStatus.key}`))}
              statusColor={(nationStatus === null ? statusColor(0) : statusColor(nationStatus.code))}
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

export default NationsListScreen;

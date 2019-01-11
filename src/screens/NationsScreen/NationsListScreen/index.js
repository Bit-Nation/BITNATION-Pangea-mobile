// @flow

import React from 'react';
import {
  View,
  SectionList,
} from 'react-native';
import _ from 'lodash';

import BackgroundImage from '../../../components/common/BackgroundImage';
import LucyButton from '../../../components/common/LucyButton';
import styles from './styles';
import NationListItem from '../../../components/common/NationListItem';
import NationListHeader from '../../../components/common/ItemsListHeader';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';
import { resolveStatus, statusColor } from '../../../utils/nations';
import Loading from '../../../components/common/Loading';
import type { NationIdType, NationType } from '../../../types/Nation';
import type { NationTab } from '../../../actions/nations';
import ScreenTitle from '../../../components/common/ScreenTitle';

type Props = {
  /**
   * @desc Array of nations to be displayed.
   */
  nations: Array<NationType>,
  /**
   * @desc Selected filter tab.
   */
  selectedTab: NationTab,
  /**
   * @desc Array of ids of users nations.
   */
  myNationIds: Array<NationIdType>,
  /**
   * @desc Function to select a filter tab.
   */
  onSelectTab: (NationTab) => boolean,
  /**
   * @desc Flag that shows if loading is in progress.
   */
  inProgress: boolean,
  /**
   * @desc Function to select specific nation.
   * @param {any} id Id of selected item.
   */
  onSelectItem: (id: any) => void,
};

const NationsListScreen = ({
  nations, myNationIds, inProgress, onSelectItem,
}: Props) => {
  const myNations = _.filter(nations, nation => _.indexOf(myNationIds, nation.id) !== -1);
  const sortedMyNations = _.sortBy(myNations, nation => nation.nationName.toUpperCase());
  const browseNations = _.filter(nations, nation => _.indexOf(myNationIds, nation.id) === -1);
  const sortedBrowseNations = _.sortBy(browseNations, nation => nation.nationName.toUpperCase());
  const sortedNations = sortedMyNations.concat(sortedBrowseNations);
  const groups = _.groupBy(sortedNations, nation => _.indexOf(myNationIds, nation.id) !== -1);
  const sections = _.map(groups, (group, key) => ({
    title: key === 'true' ? 'MY NATIONS' : 'BROWSE NATIONS',
    data: group,
  }));

  return (
    <View style={styles.nationsScreenContainer}>
      <BackgroundImage />
      <FakeNavigationBar />
      {/* <ScreenTitle title={i18n.t('screens.nations.title')} /> */}
      <SectionList
        renderItem={(item) => {
          const nation = item.item;
          const nationStatus = resolveStatus(nation);

          let statusString = '';
          if (nationStatus !== null) {
            statusString = i18n.t(`enums.nation.status.${nationStatus.key}`);
          }

          let statusTextColor = statusColor(0);
          if (nationStatus !== null) {
            statusTextColor = statusColor(nationStatus.code);
          }

          return (<NationListItem
            nationName={nation.nationName}
            onPress={onSelectItem}
            status={statusString}
            statusColor={statusTextColor}
            id={nation.id}
            citizens={nation.citizens}
          />);
        }}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section }) => <NationListHeader title={section.title} />}
        sections={sections}
        style={styles.sectionList}
      />
      <LucyButton />
      {inProgress && _.isEmpty(nations) && <Loading />}
    </View>
  );
};

export default NationsListScreen;

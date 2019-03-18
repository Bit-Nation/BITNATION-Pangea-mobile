// @flow

import React from "react";
import { View, SectionList } from "react-native";
import _ from "lodash";

import BackgroundImage from "pangea-common-reactnative/UI/BackgroundImage";
import LucyButton from "pangea-common-reactnative/UI/LucyButton";
import styles from "./styles";
import ProgressiveImage from "../../../components/ProgressiveImage";
import NationListItem from "../../NationListItem";
import NationListHeader from "pangea-common-reactnative/UI/ItemsListHeader";
import FakeNavigationBar from "pangea-common-reactnative/UI/FakeNavigationBar";
import i18n from "pangea-common/i18n";
import { resolveStatus, statusColor } from "@pangea/nations/nations-utils";
import Loading from "pangea-common-reactnative/UI/Loading";
import type { NationIdType, NationType } from "@pangea/nations/nation-types";
import type { NationTab } from "@pangea/nations/nations-actions";
import ScreenTitle from "pangea-common-reactnative/UI/ScreenTitle";

const uri =
  "https://www.ecestaticos.com/imagestatic/clipping/0df/db8/0dfdb8b1b74624f225d5b6112ade8706/jxsi-y-cup-pactan-la-ley-para-amparar-el-referendum-y-la-republica-catalana.jpg?mtime=1483018148";

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
  onSelectTab: NationTab => boolean,
  /**
   * @desc Flag that shows if loading is in progress.
   */
  inProgress: boolean,
  /**
   * @desc Function to select specific nation.
   * @param {any} id Id of selected item.
   */
  onSelectItem: (id: any) => void,
  /**
   * @desc Flag to check if tab is popular.
   */
  nationType: any,
};

const NationsListScreen = ({
  nations,
  myNationIds,
  inProgress,
  onSelectItem,
  nationType,
}: Props) => {
  const myNations = _.filter(
    nations,
    nation => _.indexOf(myNationIds, nation.id) !== -1
  );
  const sortedMyNationsName = _.sortBy(myNations, nation =>
    nation.nationName.toUpperCase()
  );

  const sortedMyNationsCitizens = _.sortBy(myNations, nation =>
    Number(nation.citizens)
  );
  
  const browseNations = _.filter(
    nations,
    nation => _.indexOf(myNationIds, nation.id) === -1
  );
  const sortedBrowseNationsName = _.sortBy(browseNations, nation =>
    nation.nationName.toUpperCase()
  );

  const sortedBrowseNationsCitizens = _.sortBy(browseNations, nation =>
    Number(nation.citizens)
  );
  //popular list
  const sortedNationsPopular = sortedMyNationsCitizens
    .concat(sortedBrowseNationsCitizens)
    .reverse()
    .slice(0, 10);
  const groupsPopular = _.groupBy(
    sortedNationsPopular,
    nation => _.indexOf(myNationIds, nation.id) !== -1
  );
  const sectionsPopular = _.map(groupsPopular, (group, key) => ({
    title: key === "true" ? "MY NATIONS" : "BROWSE NATIONS",
    data: group
  }));
  //new list
  const sortedNationsNew = sortedMyNationsName.concat(sortedBrowseNationsName);
  const groupsNew = _.groupBy(
    sortedNationsNew,
    nation => _.indexOf(myNationIds, nation.id) !== -1
  );
  const sectionsNew = _.map(groupsNew, (group, key) => ({
    title: key === "true" ? "MY NATIONS" : "BROWSE NATIONS",
    data: group
  }));

  //feature list
  const featureNations = _.filter(
    sortedNationsNew,
    nation =>
      nation.nationName === "BITNATION" ||
      nation.nationName === "Catalunya" ||
      nation.nationName === "Digital Nomads" ||
      nation.nationName === "De Pijp Nation" ||
      nation.nationName === "Ideais Radicais" ||
      nation.nationName === "Liberland" ||
      nation.nationName === "TEDx" ||
      nation.nationName === "Network Society" ||
      nation.nationName === "TAZ Nation" ||
      nation.nationName === "Serenissima Republic of Venice"
  );

  const groupsFeature = _.groupBy(
    featureNations,
    nation => _.indexOf(myNationIds, nation.id) !== -1
  );
  const sectionsFeature = _.map(groupsFeature, (group, key) => ({
    title: key === "true" ? "MY NATIONS" : "BROWSE NATIONS",
    data: group
  }));

  let sections = sectionsNew;
  switch (nationType) {
    case 2:
      sections = sectionsFeature;
      break;
    case 3:
      sections = sectionsPopular;
      break;
    default:
      break;
  }

  return (
    <View style={styles.nationsScreenContainer}>
      {/* <View style={styles.card}>
        <ProgressiveImage style={styles.headerBackground} source={{ uri }} />
      </View> */}
      {/* <ScreenTitle title={i18n.t('screens.nations.title')} /> */}
      <SectionList
        renderItem={item => {
          const nation = item.item;
          let popularNation = "";
          let statusString = "";
          const nationStatus = resolveStatus(nation);

          console.log(nation.citizens, "citizens");

          if (nation.citizens > "9") {
            popularNation = nation.citizens;
          }
          if (nationStatus !== null) {
            statusString = i18n.t(`enums.nation.status.${nationStatus.key}`);
          }

          let statusTextColor = statusColor(0);
          if (nationStatus !== null) {
            statusTextColor = statusColor(nationStatus.code);
          }

          return (
            <View>
              <NationListItem
                nationName={nation.nationName}
                onPress={onSelectItem}
                status={statusString}
                statusColor={statusTextColor}
                id={nation.id}
                citizens={nation.citizens}
              />
            </View>
          );
        }}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section }) => (
          <NationListHeader title={section.title} />
        )}
        sections={sections}
        style={styles.sectionList}
      />
      {inProgress && _.isEmpty(nations) && <Loading />}
    </View>
  );
};

export default NationsListScreen;

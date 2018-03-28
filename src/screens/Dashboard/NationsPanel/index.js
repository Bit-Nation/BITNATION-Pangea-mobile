// @flow

import React from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';
import _ from 'lodash';

import styles from './styles';
import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';
import NationListItem from '../../../components/common/NationListItem';
import { nationIsDraft } from '../../../utils/nations';
import Loading from '../../../components/common/Loading';
import type { NationIdType, NationType } from '../../../types/Nation';

const NEWEST_NATION_COUNT = 5;

type Props = {
  /**
   * @desc Array of all nations objects
   */
  +nations: Array<NationType>,
  /**
   * @desc Callback on select nation to open. Takes one parameter - id of nation.
   */
  onSelectNation: (NationIdType) => void,
  /**
   * @desc Flag if loading is in progress.
   */
  loadingInProgress: boolean,
  /**
   * @desc Style to be applied to root view.
   */
  style: any,
};

/**
 * @desc Component to render nation panel on dashboard
 * @return {React.Component} A component
 */
const NationsPanel = ({
  style, nations, onSelectNation, loadingInProgress,
}: Props) => {
  const existedNations = _.filter(nations, nation => nationIsDraft(nation) === false);
  const newestNations = _.take(_.sortBy(existedNations, nation => -nation.id), NEWEST_NATION_COUNT);
  const nationsCountStrings = i18n.t('screens.dashboard.nationsPanel.nationsCount', { count: existedNations.length });

  return (
    <View style={style}>
      <PanelView
        style={styles.nationsGridPanel}
        titleStyle={styles.panelViewTitle}
        title={i18n.t('screens.dashboard.nationsPanel.title')}
      >
        <View style={styles.nationsCountContainer}>
          <Text style={styles.body}>{nationsCountStrings.prefix}
            <Text style={styles.nationsCountString}>{nationsCountStrings.main}</Text>
            {nationsCountStrings.suffix}
          </Text>
        </View>

        {/* Nations list. This view extends the margins to edges */}
        <View style={styles.listContainer}>

          <View style={styles.panelFlatlistHeader}>
            <Text
              style={styles.nationsListHeaderText}
            >{i18n.t('screens.dashboard.nationsPanel.newNations')}
            </Text>
          </View>

          <FlatList
            renderItem={(item) => {
              const nation = item.item;
              return (
                <NationListItem
                  text={nation.nationName}
                  textStyle={styles.nationsListText}
                  onPress={onSelectNation}
                  id={nation.id}
                />);
            }}
            ItemSeparatorComponent={() => <View style={styles.sectionListSeparator} />}
            keyExtractor={item => item.id}
            data={newestNations}
          />
        </View>
      </PanelView>
      {loadingInProgress && _.isEmpty(nations) && <Loading />}
    </View>
  );
};

NationsPanel.defaultProps = {
  nations: [],
  onSelectNation: () => null,
  loadingInProgress: false,
};

export default NationsPanel;

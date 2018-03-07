import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './styles';
import PanelView from '../../../components/common/PanelView';
import i18n from '../../../global/i18n';
import NationListItem from '../../../components/common/NationListItem';
import { nationIsDraft } from '../../../utils/nations';
import Loading from '../../../components/common/Loading';

const NEWEST_NATION_COUNT = 5;

/**
 * @desc Component to render nation panel on dashboard
 * @type {React.Component}
 */
export default class NationsPanel extends Component {
  render() {
    const { style } = this.props;
    const existedNations = _.filter(this.props.nations, nation => nationIsDraft(nation) === false);
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
                    onPress={this.props.onSelectNation}
                    id={nation.id}
                  />);
              }}
              ItemSeparatorComponent={() => <View style={styles.sectionListSeparator} />}
              keyExtractor={item => item.id}
              data={newestNations}
            />
          </View>
        </PanelView>
        {this.props.loadingInProgress && _.isEmpty(this.props.nations) && <Loading />}
      </View>
    );
  }
}

NationsPanel.propTypes = {
  /**
   * @desc Array of all nations objects
   */
  nations: PropTypes.array,
  /**
   * @desc Callback on select nation to open. Takes one parameter - id of nation.
   */
  onSelectNation: PropTypes.func,
  /**
   * @desc Flag if loading is in progress.
   */
  loadingInProgress: PropTypes.bool,
};

NationsPanel.defaultProps = {
  nations: [],
  onSelectNation: () => null,
  loadingInProgress: false,
};

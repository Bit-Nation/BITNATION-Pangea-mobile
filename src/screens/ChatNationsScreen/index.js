// @flow

import React from 'react';
import { connect } from 'react-redux';

import ChatNationsListScreen from './ChatNationsListScreen';
import { switchNationTab, openNation } from '../../actions/nations';
import { screen } from '../../global/Screens';
import { resolveNation } from '../../utils/nations';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import { startNationCreation } from '../../actions/modifyNation';
import type { Navigator } from '../../types/ReactNativeNavigation';
import type { NationIdType, NationType } from '../../types/Nation';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Selected Tab Name
   */
  selectedTab: string,
  /**
   * @desc List of nations
   */
  nations?: Array<NationType>,
  /**
   * @desc List of nations ids that the current user has joined to.
   */
  myNationIds: Array<NationIdType>,
  /**
   * @desc Function to retrieve nations from the database
   */
  fetchNations: () => void,
  /**
   * @desc Function to open a nation
   * @param id Id of the nation to be opened
   */
  openNation: (id: NationIdType) => void,
};

class ChatNationsScreen extends NavigatorComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [],
      rightButtons: [],
    });
  }

  render() {
    return (
      <ChatNationsListScreen onSelectItem={this.onSelectItem} {...this.props} />
    );
  }

  onSelectItem = (id, isBot) => {
    const nation = resolveNation(this.props.nations || [], id);

    if (!nation) {
      if (isBot === true) {
        this.props.navigator.push({
          ...screen('CHAT_SCREEN'),
          passProps: { isBot },
        });
      }
      return;
    }

    this.props.openNation(id);

    this.props.navigator.push({
      ...screen('CHAT_SCREEN'),
      passProps: { isBot },
    });
  };
}

const mapStateToProps = state => ({
  ...state.nations,
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({
  onSelectTab(index) {
    dispatch(switchNationTab(index === 0 ? 'ALL_NATIONS' : 'MY_NATIONS'));
  },
  openNation(id) {
    dispatch(openNation(id));
  },
  startNationCreation() {
    dispatch(startNationCreation());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatNationsScreen);

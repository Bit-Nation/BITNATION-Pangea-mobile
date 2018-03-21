// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChatNationsListScreen from './ChatNationsListScreen';
import { switchNationTab, openNation, requestSyncNations } from '../../actions/nations';
import { screen } from '../../global/Screens';
import { resolveNation } from '../../utils/nations';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import { startNationCreation } from '../../actions/modifyNation';
import type { NationType } from '../../services/database/schemata';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: any,
  /**
   * @desc List of nations
   */
  nations?: Array<NationType>,
  /**
   * @desc Function to retrieve nations from the database
   */
  fetchNations: () => void,
  /**
   * @desc Function to open a nation
   */
  openNation: () => void,
};

class ChatNationsScreen extends NavigatorComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [],
      rightButtons: [],
    });
  }

  onWillAppear() {
    this.props.fetchNations();
  }

  render() {
    return (
      <ChatNationsListScreen onSelectItem={this.onSelectItem} {...this.props} />
    );
  }

  onSelectItem = (id, isBot) => {
    const nation = resolveNation(this.props.nations, id);

    if (!nation) {
      if (isBot === true) {
        console.log('No nation', isBot);
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

ChatNationsScreen.PropTypes = {
  navigator: PropTypes.object,
};

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
  fetchNations() {
    dispatch(requestSyncNations());
  },
  startNationCreation() {
    dispatch(startNationCreation());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatNationsScreen);

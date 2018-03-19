import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChatNationsListScreen from './ChatNationsListScreen';
import { switchNationTab, openNation, requestSyncNations } from '../../actions/nations';
import { screen } from '../../global/Screens';
import { resolveNation } from '../../utils/nations';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import { startNationCreation } from '../../actions/modifyNation';


class ChatNationsScreen extends NavigatorComponent {
  constructor(props) {
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChatNationsListScreen from './ChatNationsListScreen';
import { switchNationTab, openNation, requestFetchNations } from '../../actions/nations';
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
    super.onWillAppear();

    this.props.fetchNations();
  }

  render() {
    return (
      <ChatNationsListScreen onSelectItem={this.onSelectItem} {...this.props} />
    );
  }

  onSelectItem = (id) => {
    const nation = resolveNation(this.props.nations, id);

    if (!nation) {
      return;
    }

    this.props.openNation(id);

    this.props.navigator.push(screen('NATION_DETAILS_SCREEN'));
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
    dispatch(switchNationTab(index));
  },
  openNation(id) {
    dispatch(openNation(id));
  },
  fetchNations() {
    dispatch(requestFetchNations());
  },
  startNationCreation() {
    dispatch(startNationCreation());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatNationsScreen);

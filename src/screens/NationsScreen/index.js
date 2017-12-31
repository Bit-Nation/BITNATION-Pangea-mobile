import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import NationsListScreen from './NationsListScreen';
import { switchNationTab, openNation } from '../../actions/nations';
import Screens from '../../global/Screens';

class NationsScreen extends Component {

  render() {
    return (
      <NationsListScreen onSelectItem={this._onSelectItem} {...this.props}/>
    );
  }

  _onSelectItem = (id) => {
    openNation(id);

    const nation = _.find(this.props.nations, (nation) => nation.id === id);

    if (!nation) {
      return;
    }

    this.props.navigator.push({
      ...Screens.NATION_DETAILS_SCREEN,
      title: nation.name,
    });
  };

}

NationsScreen.PropTypes = {
  navigator: PropTypes.object,
};

const mapStateToProps = state => ({
  ...state.nations
});

const mapDispatchToProps = dispatch => ({
  onSelectTab(index) {
    dispatch(switchNationTab(index));
  },
  openNation(id) {
    dispatch(openNation(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NationsScreen);

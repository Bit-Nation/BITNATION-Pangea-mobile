import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationsListScreen from './NationsListScreen';
import { switchNationTab, openNation } from '../../actions/nations';
import Screens from '../../global/Screens';
import { resolveNation } from '../../utils/nations';

class NationsScreen extends Component {

  render() {
    return (
      <NationsListScreen onSelectItem={this._onSelectItem} {...this.props}/>
    );
  }

  _onSelectItem = (id) => {
    const nation = resolveNation(this.props.nations, id);

    if (!nation) {
      return;
    }

    this.props.openNation(id);

    this.props.navigator.push({ ...Screens.NATION_DETAILS_SCREEN });
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

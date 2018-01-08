import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NationDetailsScreen from './NationDetailsScreen';
import { switchNationTab, openNation } from '../../actions/nations';
import { androidNavigationButtons } from '../../global/Screens';

class NationDetailsContainer extends Component {

  static navigatorButtons = { ...androidNavigationButtons }

  render() {
    return (
      <NationDetailsScreen {...this.props}/>
    );
  }

}

NationDetailsContainer.PropTypes = {
  navigator: PropTypes.object,
};

const mapStateToProps = state => ({
  ...state.nations
});

const mapDispatchToProps = dispatch => ({
  onSelectTab(index) {
    dispatch(switchNationTab(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NationDetailsContainer);

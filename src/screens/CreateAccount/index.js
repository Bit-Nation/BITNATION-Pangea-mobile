// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

// @todo Import child screens component.
import type { Navigator } from '../../types/ReactNativeNavigation';
import type { EditingAccount, Account } from '../../types/Account';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

class CreateAccountContainer extends Component<Props> {

  render() {
    return (

    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountContainer);

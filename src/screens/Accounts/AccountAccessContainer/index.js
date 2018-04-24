// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import { openNation } from '../../../actions/nations';


type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to open a nation
   * @param id Id of the nation to be opened
   */
  selectedAccount: (id: number) => void,
};

class AccountAccessContainer extends NavigatorComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [],
      rightButtons: [],
    });
  }
}

const mapStateToProps = state => ({
  ...state.accounts,
});

const mapDispatchToProps = dispatch => ({
  openNation(id) {
    dispatch(openNation(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountAccessContainer);

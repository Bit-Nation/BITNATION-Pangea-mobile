// @flow

import React from 'react';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/colors';
import i18n from '../../../global/i18n';
import Root from '../../../components/dApps/Root';

type Props = {
  /**
   * @desc JSON object of layout to be displayed.
   */
  layout: Object,
  /**
   * @desc Public key of DApp that controls the screen.
   */
  dAppPublicKey: string,
}

export default class DAppModalScreen extends NavigatorComponent<Props> {
  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: i18n.t('common.cancel'),
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
  };

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.navigator.dismissModal();
    }
  }

  render() {
    return (<Root
      layout={this.props.layout}
      dApp={this.props.dAppPublicKey}
    />);
  }
}
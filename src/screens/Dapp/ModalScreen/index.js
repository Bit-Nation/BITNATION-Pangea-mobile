// @flow

import React from 'react';
import { View } from 'react-native';

import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/colors';
import i18n from '../../../global/i18n';
import Root from '../../../DAppsSDK/0.0.1/components/Root';
import GlobalStyles from '../../../global/Styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';

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

export default class DAppModalScreen extends NavigatorComponent<Props, *> {
  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: i18n.t('common.cancel'),
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
  };

  state = { isLoading: false };

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.navigator.dismissModal();
    }
  }

  render() {
    return (
      <View style={GlobalStyles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={GlobalStyles.bodyContainer}>
          <Root
            layout={this.props.layout}
            dApp={this.props.dAppPublicKey}
          />
        </View>
        {this.state.isLoading && <Loading />}
      </View>
    );
  }
}

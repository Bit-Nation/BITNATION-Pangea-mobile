// @flow

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/colors';
import i18n from '../../../global/i18n';
import Root from '../../../DAppsSDK/0.0.1/components/Root';
import GlobalStyles from '../../../global/Styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import { dAppLaunchStateChanged } from '../../../actions/dApps';

type Props = {
  /**
   * @desc JSON object of layout to be displayed.
   */
  layout: Object,
  /**
   * @desc Public key of DApp that controls the screen.
   */
  dAppPublicKey: string,
  /**
   * @desc Function to stop DApp.
   */
  closeDApp: (dAppPublicKey: string) => void,
}

class DAppModalScreen extends NavigatorComponent<Props, *> {
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
      this.props.closeDApp(this.props.dAppPublicKey);
      this.props.navigator.dismissModal();
    }
  }

  render() {
    return (
      <View style={GlobalStyles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <Root
          layout={this.props.layout}
          dAppPublicKey={this.props.dAppPublicKey}
        />
        {this.state.isLoading && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  closeDApp(dAppId) {
    dispatch(dAppLaunchStateChanged(dAppId, 'started'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DAppModalScreen);

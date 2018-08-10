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
import { dAppLaunchStateChanged, cleanDAppModal } from '../../../actions/dApps';
import { getDAppLaunchState, type State as DAppsState } from '../../../reducers/dApps';
import type { DAppModalInfo } from '../../../types/DApp';
import ScreenTitle from '../../../components/common/ScreenTitle';

type Props = {
  /**
   * @desc UI id of that modal.
   */
  modalID: string,
  /**
   * @desc DApp redux state.
   */
  dApps: DAppsState,
}

type Actions = {
  /**
   * @desc Function to stop DApp.
   */
  closeDApp: (dAppPublicKey: string) => void,
  /**
   * @desc Function to remove modal from state.
   */
  cleanDAppModal: (modalID: string) => void,
}

class DAppModalScreen extends NavigatorComponent<Props & Actions, *> {
  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: i18n.t('common.cancel'),
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
  };

  componentWillUnmount() {
    this.props.cleanDAppModal(this.props.modalID);
  }

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.closeDApp(this.modalInfo.dAppPublicKey);
      this.props.navigator.dismissModal();
    }
  }

  get modalInfo(): DAppModalInfo {
    return this.props.dApps.modals[this.props.modalID];
  }

  render() {
    const info = this.modalInfo;
    // Coming layout is a layout with container, which we don't need to render.
    // It's expected that modal component returns single root component.
    const childrenLayout = info.layout.children[0];
    const { title } = info.layout.props;
    const isLoading = getDAppLaunchState(this.props.dApps, info.dAppPublicKey) === 'working';

    return (
      <View style={GlobalStyles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        {
          title.length > 0 && <ScreenTitle title={title} />
        }
        <Root
          layout={childrenLayout}
          dAppPublicKey={info.dAppPublicKey}
        />
        {isLoading && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dApps: state.dApps,
});

const mapDispatchToProps = dispatch => ({
  closeDApp(dAppId) {
    dispatch(dAppLaunchStateChanged(dAppId, 'started'));
  },
  cleanDAppModal(modalID) {
    dispatch(cleanDAppModal(modalID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DAppModalScreen);

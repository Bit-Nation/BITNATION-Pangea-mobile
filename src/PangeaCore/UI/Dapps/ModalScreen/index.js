// @flow

import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import NavigatorComponent from '../../NavigatorComponent';
import Colors from 'pangea-common-reactnative/styles/colors';
import i18n from 'pangea-common/i18n';
import Root from '@pangea/dapps/DAppsSDK/0.0.1/components/Root';
import GlobalStyles from 'pangea-common-reactnative/styles';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import Loading from 'pangea-common-reactnative/UI/Loading';
import { dAppLaunchStateChanged, cleanDAppModal } from '@pangea/dapps/dapps-actions';
import { getDAppLaunchState, type State as DAppsState } from '@pangea/dapps/dapps-reducers';
import type { DAppModalInfo } from '@pangea/dapps/dapp-types';
import ScreenTitle from 'pangea-common-reactnative/UI/ScreenTitle';

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

  constructor(props) {
    super(props);

    this.state = {
      renderFailed: false,
    };
  }

  componentDidCatch() {
    this.setState({
      renderFailed: true,
    });
  }

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
    if (this.state.renderFailed === true) {
      // Fallback UI.
      return (
        <View style={GlobalStyles.screenContainer}>
          <BackgroundImage />
          <FakeNavigationBar />
          <View style={GlobalStyles.bodyContainer}>
            <Text style={GlobalStyles.body}>
              {i18n.t('dApps.failedDAppModalRender')}
            </Text>
          </View>
        </View>
      );
    }

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

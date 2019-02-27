// @flow

/**
 * @desc Component that renders DAppMessages.
 * @type React.Component
 */

import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { connect } from 'react-redux';

import Root from '@pangea/dApps/DAppsSDK/0.0.1/components/Root';
import type { DAppMessageType } from '@pangea/chat/chat-types';
import GlobalStyles from '../../../PangeaCommonReactNative/styles';
import { renderDAppMessage } from '@pangea/dApps/dApps-actions'
import i18n from 'pangea-common/i18n';
import { getDApp, type State as DAppsState } from '@pangea/dApps/dApps-reducers';

type Props = {
  /**
   * @desc Message to be displayed.
   */
  message: DAppMessageType,
  /**
   * @desc Function to render DApp message and get layout.
   */
  renderDAppMessage: (message: DAppMessageType, callback: (layout: ?Object) => void) => void,
  /**
   * @desc DApp redux state.
   */
  dAppsState: DAppsState,
};

type State = {
  isRendering: boolean,
  layout: ?Object,
}

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
  dAppMessageRootView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dAppMessageContainer: {
    paddingTop: 6,
    flexGrow: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 0,
  },

  loadingContainer: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  fallbackUIContainer: {
    paddingLeft: 6,
    paddingRight: 6,
  },
});

class DAppMessage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isRendering: true,
      layout: null,
    };
    this.props.renderDAppMessage(props.message, (layout) => {
      this.setState(() => ({
        isRendering: false,
        layout,
      }));
    });
  }

  componentDidCatch() {
    this.setState({
      isRendering: false,
      layout: null,
    });
  }

  renderFallbackUI() {
    const dApp = getDApp(this.props.dAppsState, this.props.message.dAppPublicKey);
    let textToShow = i18n.t('dApps.unknownDAppMessage');
    if (dApp != null) {
      textToShow = i18n.t('dApps.failedDAppMessageRender', { dAppName: dApp.name });
    }
    return (
      <View style={styles.fallbackUIContainer}>
        <Text style={styles.body}>
          {textToShow}
        </Text>
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='small' />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.dAppMessageRootView}>
        <View style={styles.dAppMessageContainer}>
          {
            this.state.layout != null
            &&
            <Root
              dAppPublicKey={this.props.message.dAppPublicKey}
              layout={this.state.layout}
            />
          }
          {
            this.state.isRendering === false
            && this.state.layout == null
            && this.renderFallbackUI()
          }
        </View>
        {
          this.state.isRendering === true && this.renderLoading()
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dAppsState: state.dApps,
});

const mapDispatchToProps = dispatch => ({
  renderDAppMessage(message, callback) {
    dispatch(renderDAppMessage(message, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DAppMessage);

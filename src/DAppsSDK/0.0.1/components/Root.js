// @flow

import React, { Component } from 'react';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { View as ReactNativeView } from 'react-native';
import { connect } from 'react-redux';

import { type ComponentsJSON, renderJSON } from '../utils/renderer';

import { performDAppCallback } from '../../../actions/dApps';

export type Props = {
  /**
   * @desc Layout in JSON form provided by DApp developer to be rendered inside Root component
   */
  layout: ComponentsJSON,
  /**
   * @desc Public key of DApp that view is related to.
   */
  dAppPublicKey: string,
  /**
   * @desc Action to perform a DApp callback.
   */
  performDAppCallback: (appId: string, callbackID: number, args: Object) => void,
}

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

class Root extends Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  performCallbackByID = (callbackID: number, args: Object) => {
    this.props.performDAppCallback(this.props.dAppPublicKey, callbackID, args);
  };

  generateCustomProps = (component: any, ownProps: Object) => {
    if (component == null) {
      return {};
    }

    const { callbackProps = [] } = component;
    const resultedProps = {};

    if (Array.isArray(callbackProps)) {
      callbackProps.forEach((nameWithoutID) => {
        if (typeof nameWithoutID !== 'string') {
          return;
        }

        // Names on components are specified without 'ID' suffix to match native props.
        const propName = `${nameWithoutID}ID`;
        const callbackID = ownProps[propName];
        if (callbackID == null) return;
        if (typeof callbackID !== 'number') {
          console.warn(`Callback id ${callbackID} must be a number.`);
          return;
        }

        resultedProps[nameWithoutID] = args => this.performCallbackByID(callbackID, args);
      });
    }

    return resultedProps;
  };

  render() {
    return (
      <ReactNativeView style={styles.container}>
        {renderJSON(this.props.layout, undefined, this.generateCustomProps)}
      </ReactNativeView>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  performDAppCallback(dAppId, callbackId, state) {
    dispatch(performDAppCallback(dAppId, callbackId, { state }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

// @flow

import React, { Component } from 'react';
import { TouchableWithoutFeedback, View as ReactNativeView, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { type ComponentsJSON, renderJSON } from '../utils/renderer';

import { performDAppCallback } from '../../../actions/dApps';
import GlobalStyles from '../../../global/Styles';

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

class Root extends Component<Props> {
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
      callbackProps.forEach((callbackName) => {
        if (typeof callbackName !== 'string') {
          return;
        }

        const callbackID = ownProps[callbackName];
        if (callbackID == null) return;
        if (typeof callbackID !== 'number') {
          console.warn(`Callback id ${callbackID} must be a number.`);
          return;
        }

        resultedProps[callbackName] = data => this.performCallbackByID(callbackID, data);
      });
    }

    return resultedProps;
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
        <ReactNativeView style={GlobalStyles.bodyContainer}>
          {renderJSON(this.props.layout, undefined, this.generateCustomProps)}
        </ReactNativeView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  performDAppCallback(dAppId, callbackId, payload) {
    dispatch(performDAppCallback(dAppId, callbackId, { payload }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

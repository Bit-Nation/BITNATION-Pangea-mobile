// @flow

import React, { Component } from 'react';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { View as ReactNativeView } from 'react-native';
import { connect } from 'react-redux';

import { type ComponentsJSON, renderJSON } from '../../utils/dApps/renderer';
import { updatePartByKeyPath } from '../../utils/dApps/updates';

import { performDAppCallback } from '../../actions/dApps';

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
  performDAppCallback: (appId: string, callbacID: number, state: any) => void,
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

  getStateByKeyPath = (keyPath: string): any =>
    keyPath
      .split('.')
      .reduce(
        (obj: any, key: string): any => (obj != null ? obj[key] : undefined),
        this.state,
      );

  updateStateByKeyPath = (keyPath: string, value: any) => {
    this.setState(prevState => updatePartByKeyPath(prevState, keyPath, value));
  };

  performCallbackByID = (callbackID: number) => {
    this.props.performDAppCallback(this.props.dAppPublicKey, callbackID, this.state);
  };

  generateCustomProps = (component: any, ownProps: Object) => {
    if (component == null) {
      return {};
    }

    const { stateBasedProps = {}, callbackProps = [] } = component;
    const resultedProps = {};

    Object.keys(stateBasedProps).forEach((nameWithoutPath) => {
      const propKind = stateBasedProps[nameWithoutPath];
      // Names on components are specified without 'Path' suffix to match native props.
      const propName = `${nameWithoutPath}Path`;
      const propKeyPath = ownProps[propName];
      if (propKeyPath == null) return;
      if (typeof propKeyPath !== 'string') {
        console.warn(`Prop ${propName} must be a key path string linking to location in the state.`);
        return;
      }
      if (propKind === 'set') {
        // It's a setting property
        resultedProps[nameWithoutPath] = value => this.updateStateByKeyPath(propKeyPath, value);
      } else {
        // It's a getting property
        resultedProps[nameWithoutPath] = this.getStateByKeyPath(propKeyPath);
      }
    });

    callbackProps.forEach((nameWithoutID) => {
      // Names on components are specified without 'ID' suffix to match native props.
      const propName = `${nameWithoutID}ID`;
      const callbackID = ownProps[propName];
      if (callbackID == null) return;
      if (typeof callbackID !== 'number') {
        console.warn(`Callback id ${callbackID} must be a number.`);
        return;
      }

      resultedProps[nameWithoutID] = () => this.performCallbackByID(callbackID);
    });

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

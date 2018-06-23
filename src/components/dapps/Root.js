// @flow

import React, { Component } from 'react';

import { View as ReactNativeView } from 'react-native';

import { type ComponentsJSON, renderJSON } from '../../utils/dapps/renderer';

export type Props = {
  /**
   * @desc JSON provided by DApp developer to be rendered inside Root component
   */
  componentsJSON: ComponentsJSON
}

export default class Root extends Component<Props, any> {
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

  updateStateByKey = (key: string, value: any) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  performCallbackByName = (callbackName: string) => {
    // @todo Panthalassa call
  };

  generateCustomProps = (component: any, ownProps: Object) => {
    if (component == null) {
      return {};
    }

    const { stateBasedProps = {} } = component;
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
        resultedProps[nameWithoutPath] = value => this.updateStateByKey(propKeyPath, value);
      } else {
        // It's a getting property
        resultedProps[nameWithoutPath] = this.getStateByKeyPath(propKeyPath);
      }
    });

    return resultedProps;
  };

  render() {
    return (
      <ReactNativeView style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        {renderJSON(this.props.componentsJSON, undefined, this.generateCustomProps)}
      </ReactNativeView>
    );
  }
}

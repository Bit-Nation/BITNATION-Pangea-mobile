import React, { Component } from 'react';

import { View as ReactNativeView } from 'react-native';

import { type ComponentsJSON, renderJSON } from '../../utils/dapps/renderer';

export type Props = {
  /**
   * @desc JSON provided by DApp developer to be rendered inside Root component
   */
  componentsJSON: ComponentsJSON
}

export default class Root extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  updateStateByKey = (key: string, value: any) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  performCallbackByName = (callbackName: string) => {
    // @todo Panthalassa call
  };

  generateCustomProps = (type: string, ownProps: Object) => ({});

  render() {
    return (
      <ReactNativeView style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        {renderJSON(this.props.componentsJSON, undefined, this.generateCustomProps)}
      </ReactNativeView>
    );
  }
}

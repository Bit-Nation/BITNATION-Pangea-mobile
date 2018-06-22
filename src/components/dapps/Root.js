import React, { Component } from 'react';

import { View as ReactNativeView } from 'react-native';

import View from './View';
import Text from './Text';

export type ComponentsJSON = { type: string, props: Object, children: Array<Object> };

export const getTypeElementFromText = (key) => {
  switch (key) {
    case 'Text':
      return Text;
    case 'View':
      return View;
    default:
      return View;
  }
};

export const validateProps = (props: Object, validPropNames: Array<string>, type: string) => {
  const filteredProps = {};
  Object.keys(props).forEach((propName) => {
    if (validPropNames.includes(propName)) {
      filteredProps[propName] = props[propName];
    } else {
      console.warn(`Prop ${propName} is not allowed on component ${type}`);
    }
  });

  return filteredProps;
};

export const renderJSON = (json: ComponentsJSON, key: any, customPropsProvider: (type: string, ownProps: Object) => Object) => {
  const { type, children } = json;
  const component = getTypeElementFromText(type);
  let { props } = json;

  if (Array.isArray(component.validProps) && component.validProps !== undefined) {
    props = validateProps(json.props, component.validProps, type);
  }

  return React.createElement(
    component,
    { ...props, ...customPropsProvider(type, props), key },
    children
      ? children.map((child, index) => renderJSON(child, index, customPropsProvider))
      : null,
  );
};

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

// @flow

import React from 'react';

import Text from '../../components/dapps/Text';
import View from '../../components/dapps/View';
import TextInput from '../../components/dapps/TextInput';

export type ComponentsJSON = { type: string, props: Object, children: Array<Object> };

/**
 * @desc Function to get element class or function from text representation, e.g. 'Text' means Text component.
 * @param {string} typeName String representation of the type.
 * @return {*} Class or function of component or null if type is unknown.
 */
export const getTypeElementFromText = (typeName: string) => {
  switch (typeName) {
    case 'Text':
      return Text;
    case 'View':
      return View;
    case 'TextInput':
      return TextInput;
    default:
      console.warn(`Unknown component type ${typeName}.`);
      return null;
  }
};

/**
 * @desc Validates props against list of valid names and filter only whitelisted ones.
 * Used to prevent DApp developer to pass something bad to components we provide.
 * @param {Object} props Props to validate.
 * @param {string[]} validNativeProps Array of valid native props.
 * @param {string[]} validAdditionalProps Array of valid additional props that is used to set/get from root component state and therefore should be appended by 'Path'. E.g. value prop will be passed as valuePath.
 * @param {string} type String representation of component type.
 * @return {Object} Filtered props.
 */
export const validateProps = (props: Object, validNativeProps: Array<string>, validAdditionalProps: Array<string>, type: string) => {
  const filteredProps = {};
  const additionalProps = {};
  Object.keys(props).forEach((propName) => {
    if (validNativeProps.includes(propName)) {
      // It's an allowed native prop.
      filteredProps[propName] = props[propName];
    } else if (propName.endsWith('Path') && validAdditionalProps.includes(propName.substring(0, propName.length - 4))) {
      // It's an allowed prop to set or get root component state. That properties are marked by Path suffix.
      additionalProps[propName] = props[propName];
    } else {
      console.warn(`Prop ${propName} is not allowed on component ${type}`);
    }
  });

  return { filteredProps, additionalProps };
};

/**
 * @desc Renders JSON provided by DApp developer into react components.
 * @param {ComponentsJSON} json JSON object that represents components to render.
 * @param {?string} key Key of component (used for updates).
 * @param {Function} customPropsProvider Function that takes component class or function and props and returns new props if it's needed to add ones.
 * @param {*} parent Function or class of component that is parent of currently used or undefined for root.
 * @return {*} Tree of components that is ready to be render.
 */
export const renderJSON = (json: ComponentsJSON, key: ?string, customPropsProvider: (component: any, ownProps: Object) => Object, parent: any) => {
  const { type, children } = json;

  // This is the case when we have string literal inside children.
  // It's only allowed for Text.
  if (type === undefined && typeof (json) === 'string') {
    if (parent === Text) {
      return json;
    }

    console.warn(`String literal may only appear inside Text component. Found "${json}" outside.`);
    return null;
  }

  const component = getTypeElementFromText(type);

  if (component === null) {
    return null;
  }

  const { props } = json;

  const { filteredProps = props, additionalProps = {} } = component.validNativeProps !== undefined ?
    validateProps(json.props, component.validNativeProps, Object.keys(component.stateBasedProps || {}), type) : {};

  return React.createElement(
    component,
    { ...filteredProps, ...customPropsProvider(component, { ...filteredProps, ...additionalProps }), key },
    children
      ? children.map((child, index) => renderJSON(child, `${index}`, customPropsProvider, component))
      : null,
  );
};

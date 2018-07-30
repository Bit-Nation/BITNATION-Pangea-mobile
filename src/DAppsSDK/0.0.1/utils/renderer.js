// @flow

import React from 'react';
import components from '../components';

export type ComponentsJSON = { type: string, props: Object, children: Array<Object> };

/**
 * @desc Function to get element class or function from text representation, e.g. 'Text' means Text component.
 * @param {string} typeName String representation of the type.
 * @return {*} Class or function of component or null if type is unknown.
 */
export const getTypeElementFromText = (typeName: string) => components[typeName];

/**
 * @desc Validates props against list of valid names and filter only whitelisted ones.
 * Used to prevent DApp developer to pass something bad to components we provide.
 * @param {Object} props Props to validate.
 * @param {string[]} validProps Object containing arrays by keys `native`, `stateBased` and `callbacks` according to corresponding type of props.
 * @param {string} type String representation of component type.
 * @return {Object} Props filtered by groups.
 */
export const validateProps = (
  props: Object,
  validProps: { native: Array<string>, custom: Array<string>, callbacks: Array<string> },
  type: string,
) => {
  const nativeProps = {};
  const customProps = {};
  const callbackProps = {};
  Object.keys(props).forEach((propName) => {
    if (typeof propName !== 'string') {
      console.warn('Prop name is not a string');
      return;
    }

    if (validProps.native.includes(propName)) {
      // It's an allowed native prop.
      nativeProps[propName] = props[propName];
    } else if (validProps.custom.includes(propName)) {
      // It's an allowed custom prop.
      customProps[propName] = props[propName];
    } else if (propName.endsWith('ID') && validProps.callbacks.includes(propName.substring(0, propName.length - 2))) {
      // It's an allowed prop to perform a callback. That properties are marked by ID suffix.
      callbackProps[propName] = props[propName];
    } else {
      console.warn(`Prop ${propName} is not allowed on component ${type}`);
    }
  });

  return { nativeProps, customProps, callbackProps };
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
    if (parent === components.Text) {
      return json;
    }

    console.warn(`String literal may only appear inside Text component. Found "${json}" outside.`);
    return null;
  }

  const component = components[type];

  if (component == null) {
    console.warn(`Trying to render unknown component type ${type}.`);
    return null;
  }

  if (component.validNativeProps != null && Array.isArray(component.validNativeProps) === false) {
    console.warn(`validNativeProps field of component ${type} should be an array of strings.`);
    return null;
  }
  if (component.customProps != null && Array.isArray(component.customProps) === false) {
    console.warn(`customProps field of component ${type} should be an array of strings.`);
    return null;
  }
  if (component.callbackProps != null && Array.isArray(component.callbackProps) === false) {
    console.warn(`callbackProps field of component ${type} should be an array of strings.`);
    return null;
  }

  const { props } = json;

  const { nativeProps = props, customProps = {}, callbackProps = {} } =
    validateProps(json.props, {
      native: component.validNativeProps || [],
      custom: component.customProps || [],
      callbacks: component.callbackProps || [],
    }, type);

  return React.createElement(
    component,
    {
      nativeProps,
      ...customProps,
      ...customPropsProvider(component, { ...nativeProps, ...customProps, ...callbackProps }),
      key,
    },
    children
      ? children.map((child, index) => renderJSON(child, `${index}`, customPropsProvider, component))
      : null,
  );
};

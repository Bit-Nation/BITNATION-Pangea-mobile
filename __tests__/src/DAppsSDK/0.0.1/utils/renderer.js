import React from 'react';

import { getTypeElementFromText, renderJSON, validateProps } from '../../../../../src/DAppsSDK/0.0.1/utils/renderer';
import View from '../../../../../src/DAppsSDK/0.0.1/components/View';
import Text from '../../../../../src/DAppsSDK/0.0.1/components/Text';
import TextInput from '../../../../../src/DAppsSDK/0.0.1/components/TextInput';
import Button from '../../../../../src/DAppsSDK/0.0.1/components/Button';

React.createElement = jest.fn().mockImplementation((component, props, children) => ({
  component,
  props,
  children,
}));

test('getTypeElementFromText', () => {
  expect(getTypeElementFromText('Text')).toEqual(Text);
  expect(getTypeElementFromText('View')).toEqual(View);
  expect(getTypeElementFromText('TextInput')).toEqual(TextInput);
  expect(getTypeElementFromText('Button')).toEqual(Button);
  expect(getTypeElementFromText('Something unknown')).toBeUndefined();
});

test('validateProps', () => {
  expect(validateProps(
    {
      allowedNativeProp1: 'ALLOWED_NATIVE_PROP_1',
      allowedNativeProp2: 'ALLOWED_NATIVE_PROP_2',
      disallowedNativeProp3: 'DISALLOWED_NATIVE_PROP_3',
      someCustomProp1: 'SOME_CUSTOM_PROP_1',
      someCustomProp2: 'SOME_CUSTOM_PROP_2',
      badCustomProp: 'BAD_CUSTOM_PROP',
      onPressID: 'ON_PRESS',
      badCallbackID: 'BAD_CALLBACK',
    }, {
      native: ['allowedNativeProp1', 'allowedNativeProp2'],
      custom: ['someCustomProp1', 'someCustomProp2'],
      callbacks: ['onPress'],
    },
    'COMPONENT_TYPE',
  )).toEqual({
    nativeProps: {
      allowedNativeProp1: 'ALLOWED_NATIVE_PROP_1',
      allowedNativeProp2: 'ALLOWED_NATIVE_PROP_2',
    },
    customProps: {
      someCustomProp1: 'SOME_CUSTOM_PROP_1',
      someCustomProp2: 'SOME_CUSTOM_PROP_2',
    },
    callbackProps: {
      onPressID: 'ON_PRESS',
    },
  });
});

describe('renderJSON', () => {
  test('single view', () => {
    expect(renderJSON({
      type: 'View',
      props: {},
      children: null,
    }, undefined, () => ({}))).toEqual({
      component: View,
      props: { nativeProps: {} },
      children: null,
    });
  });

  test('unknown component', () => {
    expect(renderJSON({ type: 'Something unknown' }, undefined, () => ({}))).toBeNull();
  });

  test('string literal outside Text', () => {
    expect(renderJSON({ type: 'View', children: ['Something unknown'], props: {} }, undefined, () => ({}))).toEqual({
      component: View,
      props: { nativeProps: {} },
      children: [null],
    });
  });

  test('complex JSON', () => {
    const json = {
      type: 'View',
      props: { style: { backgroundColor: 'yellow', flex: 1 } },
      children: [
        {
          type: 'Text',
          props: { style: { color: 'red' } },
          children: [
            'Red text',
          ],
        },
        {
          type: 'View',
          props: { style: { backgroundColor: 'blue' } },
          children: [
            {
              type: 'Text',
              props: { style: { color: 'white' } },
              children: [{
                type: 'Text',
                props: { style: { color: 'red' } },
                children: [
                  'White bold text',
                ],
              },
              'And text',
              ],
            },
          ],
        },
        {
          type: 'TextInput',
          props: {
            style: { width: 200, height: 50 },
            onEndEditingID: 1,
          },
        },
        {
          type: 'TextInput',
          props: { style: { width: 200, height: 50 } },
        },
        {
          type: 'Button',
          props: {
            style: { width: 100, height: 50, backgroundColor: 'green' },
            title: 'Hey',
            onPressID: 2,
          },
        },
      ],
    };

    const customPropsProvider = (component, ownProps) => ({
      ownPropsCount: Object.keys(ownProps).length,
    });

    expect(renderJSON(json, undefined, customPropsProvider)).toEqual({
      component: View,
      props: {
        nativeProps: { style: { backgroundColor: 'yellow', flex: 1 } },
        key: undefined,
        ownPropsCount: 1,
      },
      children: [
        {
          component: Text,
          props: {
            nativeProps: {},
            style: { color: 'red' },
            key: '0',
            ownPropsCount: 1,
          },
          children: [
            'Red text',
          ],
        },
        {
          component: View,
          props: {
            nativeProps: { style: { backgroundColor: 'blue' } },
            key: '1',
            ownPropsCount: 1,
          },
          children: [
            {
              component: Text,
              props: {
                nativeProps: {},
                style: { color: 'white' },
                key: '0',
                ownPropsCount: 1,
              },
              children: [{
                component: Text,
                props: {
                  nativeProps: {},
                  style: { color: 'red' },
                  key: '0',
                  ownPropsCount: 1,
                },
                children: [
                  'White bold text',
                ],
              },
              'And text',
              ],
            },
          ],
        },
        {
          children: null,
          component: TextInput,
          props: {
            nativeProps: {
              style: { width: 200, height: 50 },
            },
            key: '2',
            ownPropsCount: 2,
          },
        },
        {
          children: null,
          component: TextInput,
          props: {
            nativeProps: {
              style: { width: 200, height: 50 },
            },
            key: '3',
            ownPropsCount: 1,
          },
        },
        {
          children: null,
          component: Button,
          props: {
            nativeProps: {},
            style: { width: 100, height: 50, backgroundColor: 'green' },
            title: 'Hey',
            key: '4',
            ownPropsCount: 3,
          },
        },
      ],
    });
  });
});

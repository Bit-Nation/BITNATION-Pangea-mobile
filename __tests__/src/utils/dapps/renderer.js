import React from 'react';

import { getTypeElementFromText, renderJSON, validateProps } from '../../../../src/utils/dapps/renderer';
import View from '../../../../src/components/dapps/View';
import Text from '../../../../src/components/dapps/Text';
import TextInput from '../../../../src/components/dapps/TextInput';
import Button from '../../../../src/components/dapps/Button';

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
  expect(getTypeElementFromText('Something unknown')).toBeNull();
});

test('validateProps', () => {
  expect(validateProps(
    {
      allowedNativeProp1: 'ALLOWED_NATIVE_PROP_1',
      allowedNativeProp2: 'ALLOWED_NATIVE_PROP_2',
      disallowedNativeProp3: 'DISALLOWED_NATIVE_PROP_3',
      disabledPath: 'DISABLED',
      onChangeTextPath: 'ON_CHANGE_TEXT',
      badStateBasedPropertyPath: 'BAD_STATE_BASED_PROPERTY',
      onValidChangedPath: 'ON_VALID_CHANGED',
      onPressID: 'ON_PRESS',
      badCallbackID: 'BAD_CALLBACK',
    }, {
      native: ['allowedNativeProp1', 'allowedNativeProp2'],
      stateBased: ['disabled', 'onChangeText'],
      callbacks: ['onPress'],
    },
    'COMPONENT_TYPE',
  )).toEqual({
    nativeProps: {
      allowedNativeProp1: 'ALLOWED_NATIVE_PROP_1',
      allowedNativeProp2: 'ALLOWED_NATIVE_PROP_2',
    },
    stateBasedProps: {
      disabledPath: 'DISABLED',
      onChangeTextPath: 'ON_CHANGE_TEXT',
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
      props: {},
      children: null,
    });
  });

  test('unknown component', () => {
    expect(renderJSON({ type: 'Something unknown' }, undefined, () => ({}))).toBeNull();
  });

  test('string literal outside Text', () => {
    expect(renderJSON({ type: 'View', children: ['Something unknown'], props: {} }, undefined, () => ({}))).toEqual({
      component: View,
      props: {},
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
            onChangeTextPath: 'textInput1.text',
            onEndEditingID: 'text callback',
          },
        },
        {
          type: 'TextInput',
          props: { style: { width: 200, height: 50 }, valuePath: 'textInput1.text' },
        },
        {
          type: 'Button',
          props: {
            style: { width: 100, height: 50, backgroundColor: 'green' },
            title: 'Hey',
            onPressID: 'BUTTON CALLBACK',
            disabledPath: 'textInput1.text.length',
          },
        },
      ],
    };

    const customPropsProvider = (component, ownProps) => ({
      type: component,
      ownPropsCount: Object.keys(ownProps).length,
    });

    expect(renderJSON(json, undefined, customPropsProvider)).toEqual({
      component: View,
      props: {
        style: { backgroundColor: 'yellow', flex: 1 }, type: View, key: undefined, ownPropsCount: 1,
      },
      children: [
        {
          component: Text,
          props: {
            style: { color: 'red' }, type: Text, key: '0', ownPropsCount: 1,
          },
          children: [
            'Red text',
          ],
        },
        {
          component: View,
          props: {
            style: { backgroundColor: 'blue' }, type: View, key: '1', ownPropsCount: 1,
          },
          children: [
            {
              component: Text,
              props: {
                style: { color: 'white' }, type: Text, key: '0', ownPropsCount: 1,
              },
              children: [{
                component: Text,
                props: {
                  style: { color: 'red' }, type: Text, key: '0', ownPropsCount: 1,
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
            style: { width: 200, height: 50 }, type: TextInput, key: '2', ownPropsCount: 3,
          },
        },
        {
          children: null,
          component: TextInput,
          props: {
            style: { width: 200, height: 50 }, type: TextInput, key: '3', ownPropsCount: 2,
          },
        },
        {
          children: null,
          component: Button,
          props: {
            style: { width: 100, height: 50, backgroundColor: 'green' },
            title: 'Hey',
            type: Button,
            key: '4',
            ownPropsCount: 4,
          },
        },
      ],
    });
  });
});

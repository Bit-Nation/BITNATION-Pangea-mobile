// @flow

import rootReducer, { subReducers } from '../../../src/reducers';

test('rootReducer contains all child reducers', () => {
  const reducerNames = [
    'accounts',
    'activity',
    'chat',
    'key',
    'modifyNation',
    'nations',
    'testingMode',
    'wallet',
    'settings',
  ];

  reducerNames.forEach((reducerName) => {
    const reducer = subReducers[reducerName];
    expect(reducer).toBeDefined();
    expect(typeof reducer).toBe('function');
  });

  expect(Object.keys(subReducers)).toHaveLength(reducerNames.length);
});

test('default export is a reducer', () => {
  expect(typeof rootReducer).toBe('function');
});

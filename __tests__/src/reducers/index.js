import rootReducer, { subReducers } from '../../../src/reducers';

test('rootReducer contains all child reducers', () => {
  const reducerNames = [
    'activity',
    'chat',
    'key',
    'modifyNation',
    'nations',
    'profile',
    'testingMode',
    'profile',
  ];

  reducerNames.forEach((reducerName) => {
    const reducer = subReducers[reducerName];
    expect(reducer).toBeDefined();
    expect(typeof reducer).toBe('function');
  });
});

test('default export is a reducer', () => {
  expect(typeof rootReducer).toBe('function');
});

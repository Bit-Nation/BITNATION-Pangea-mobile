// @flow

import {
  START_NAVIGATION,
  startNavigation,
} from '../navigation-actions';

describe('navigation action creators', () => {
  test('makeStep', () => {
    expect(startNavigation()).toEqual({
      type: START_NAVIGATION,
    });
  });
});

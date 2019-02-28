// @flow

import {
  START_NAVIGATION,
  startNavigation,
} from '../../../src/actions/navigation';

describe('navigation action creators', () => {
  test('makeStep', () => {
    expect(startNavigation()).toEqual({
      type: START_NAVIGATION,
    });
  });
});

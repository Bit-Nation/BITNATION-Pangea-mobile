// @flow

export const START_NAVIGATION = 'START_NAVIGATION';

export type StartNavigationAction = { +type: 'START_NAVIGATION' };

/**
 * @desc Action creator for an action that used to activate navigation saga that handles navigation.
 * It is required to use specific action for that, since we may have to wait for some stuff to be done (e.g. screen register)
 * @return {StartNavigationAction} An action.
 */
export function startNavigation(): StartNavigationAction {
  return {
    type: START_NAVIGATION,
  };
}

// @flow

export type ServicesCreatedAction = { +type: 'SERVICES_CREATED' };
export type ServicesDestroyedAction = { +type: 'SERVICES_DESTROYED' };

export const SERVICES_CREATED = 'SERVICES_CREATED';
export const SERVICES_DESTROYED = 'SERVICES_DESTROYED';

/**
 * @desc Action creator for an action that is called when services are created.
 * @returns {ServicesCreatedAction} An action.
 */
export function servicesCreated(): ServicesCreatedAction {
  return {
    type: SERVICES_CREATED,
  };
}

/**
 * @desc Action creator for an action that is called when services are destroyed.
 * @returns {ServicesDestroyedAction} An action.
 */
export function servicesDestroyed(): ServicesDestroyedAction {
  return {
    type: SERVICES_DESTROYED,
  };
}

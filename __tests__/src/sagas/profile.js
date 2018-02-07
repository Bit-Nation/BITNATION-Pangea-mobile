import { call, put, select, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils';
import watchProfileUpdate, { updateProfile, getProfile, getProfileState } from '../../../src/sagas/profile'
import { REQUEST_PROFILE_UPDATE, DONE_USER_EDITING, SET_USER_PROFILE, REQUEST_GET_PROFILE, CANCEL_USER_EDITING } from '../../../src/actions/profile';
import { getPangeaLibrary } from '../../../src/services/container';

jest.mock('BITNATION-Pangea-libs', () => ({
  profile: {
    profile: {
      setProfile: jest.fn(),
      getProfile: jest.fn()
    }
  }
}));

jest.mock('react-native-config', () => ({
  ETH_HTTP_ENDPOINT: 'https://rinkeby.infura.io/metamask',
  PRODUCTION: 'false'
}));

const pangeaLibrary = {
  profile: {
    profile: {
      setProfile: jest.fn(),
      getProfile: jest.fn()
    }
  }
}
const stepper = (fn) => (mock) => fn.next(mock).value

test('sagas - profile watcher', (done) => {
  const step = stepper(watchProfileUpdate())
  expect(step()).toEqual(takeEvery(REQUEST_PROFILE_UPDATE, updateProfile))
  expect(step()).toEqual(takeEvery(REQUEST_GET_PROFILE, getProfile))
  done()
})

test('sagas - updateProfile', (done) => {
  const mockAction = {
    type: REQUEST_PROFILE_UPDATE
  }
  
  const iterator = cloneableGenerator(updateProfile)(mockAction)
  expect(iterator.next().value).toEqual(call(getPangeaLibrary))
  expect(iterator.next(pangeaLibrary).value).toEqual(select(getProfileState))
  const mockUser = {
    editingUser: {
      name: 'Jack',
      location: 'NYC',
      latitude: '42',
      longitude: '24'
    }
  }

  const profile = {
    id: 0,
    name: mockUser.editingUser.name ? mockUser.editingUser.name.trim() : '',
    location: mockUser.editingUser.location ? mockUser.editingUser.location.trim() : '',
    latitude: mockUser.editingUser.latitude ? mockUser.editingUser.latitude : '',
    longitude: mockUser.editingUser.longitude ? mockUser.editingUser.longitude : '',
    description: '',
    version: '0',
    image: mockUser.editingUser.avatar ? mockUser.editingUser.avatar : '',
  }
  expect(iterator.next(mockUser).value).toEqual(call(pangeaLibrary.profile.profile.setProfile, profile))

  // clone and test the success case
  const successIterator = iterator.clone()
  expect(successIterator.next().value).toEqual(put({ type: DONE_USER_EDITING }))
  
  // clone and test the failure case
  const failureIterator = iterator.clone()
  expect(failureIterator.throw('error').value).toEqual(put({ type: CANCEL_USER_EDITING }))
  
  done()
})

test('sagas - getProfile', (done) => {
  const mockAction = {
    type: REQUEST_GET_PROFILE
  }
  const iterator = cloneableGenerator(getProfile)(mockAction)
  expect(iterator.next().value).toEqual(call(getPangeaLibrary))
  expect(iterator.next(pangeaLibrary).value).toEqual(call(pangeaLibrary.profile.profile.getProfile))
  
  // clone and test the success case
  const successIterator = iterator.clone()
  const mockProfile = {
    name: 'Jack',
    location: 'NYC',
    image: null
  }
  expect(successIterator.next(mockProfile).value).toEqual(put({ type: SET_USER_PROFILE, user: {...mockProfile, avatar: null }}));
  
  // clone and test the failure case
  const failureIterator = iterator.clone()
  expect(failureIterator.throw('error').value).toEqual(put({ type: SET_USER_PROFILE, user: null }))

  done()
})

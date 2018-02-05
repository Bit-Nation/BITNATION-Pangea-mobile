import { call, put, select } from 'redux-saga/effects'
import { updateProfile, getProfile, getProfileState } from '../../../src/sagas/profile'
import { REQUEST_PROFILE_UPDATE, DONE_USER_EDITING, SET_USER_PROFILE, REQUEST_GET_PROFILE } from '../../../src/actions/profile';
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

test('sagas - updateProfile', (done) => {
  const mockAction = {
    type: REQUEST_PROFILE_UPDATE
  }
  
  const step = stepper(updateProfile(mockAction))
  expect(step()).toEqual(call(getPangeaLibrary))
  expect(step(pangeaLibrary)).toEqual(select(getProfileState))
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
  expect(step(mockUser)).toEqual(call(pangeaLibrary.profile.profile.setProfile, profile))
  expect(step()).toEqual(put({ type: DONE_USER_EDITING }));
  done()
})

test('sagas - getProfile', (done) => {
  const mockAction = {
    type: REQUEST_GET_PROFILE
  }
  const step = stepper(getProfile(mockAction))
  expect(step()).toEqual(call(getPangeaLibrary))
  expect(step(pangeaLibrary)).toEqual(call(pangeaLibrary.profile.profile.getProfile))
  const mockProfile = {
    name: 'Jack',
    location: 'NYC',
    image: null
  }
  expect(step(mockProfile)).toEqual(put({ type: SET_USER_PROFILE, user: {...mockProfile, avatar: null }}));
  done()
})

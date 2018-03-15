// @flow

import type {ProfileType} from './schemata';
const Realm = require('realm');

export default {
    findProfiles: (realm: Realm): Array<ProfileType> => realm.objects('Profile'),
};

// @flow

// eslint-disable-next-line import/prefer-default-export
export type { ProfileType as ProfileDatabaseType } from 'BITNATION-Pangea-libs/src/database/schemata';

export type ProfileType = {
  name: ?string,
  location: ?string,
  avatar: ?string,
  ethAddress: ?string,
};

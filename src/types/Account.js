// @flow

export type NetworkType = 'main' | 'dev';

export type Account = {
  id: string,
  name: string,
  location: ?string,
  avatar: ?string,
  networkType: NetworkType,
};

export type EditingAccount = {
  id: ?number,
  name: ?string,
  location: ?string,
  avatar: ?string,
  networkType: NetworkType,
}

// @flow

export type NetworkType = 'main' | 'dev';

export type Account = {
  id: string,
  name: string,
  location: ?string,
  avatar: ?string,
  accountStore: string,
  networkType: NetworkType,
};

export type EditingAccount = {
  id: ?string,
  name: ?string,
  location: ?string,
  avatar: ?string,
  accountStore: ?string,
  networkType: ?NetworkType,
}

// @flow

export type NetworkType = 'main' | 'dev';

export type Account = {
  id: string,
  name: string,
  location: ?string,
  avatar: ?string,
  accountStore: string,
  networkType: NetworkType,
  confirmedMnemonic: boolean,
};

export type PartialAccount = {
  id: string,
  name: ?string,
  location: ?string,
  avatar: ?string,
  accountStore: ?string,
  networkType: NetworkType,
}

export type Profile = {
  name: string,
  location: ?string,
  avatar: ?string,
};

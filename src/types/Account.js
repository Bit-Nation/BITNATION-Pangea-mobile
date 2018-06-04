// @flow

export type NetworkType = 'main' | 'dev';

export type Account = {
  id: string,
  // accountId: string,
  name: string,
  location: ?string,
  avatar: ?string,
  accountStore: string,
  networkType: NetworkType,
  confirmedMnemonic: boolean,
};

export type PartialAccount = {
  id: string,
  // accountId: string,
  name: ?string,
  location: ?string,
  avatar: ?string,
  accountStore: ?string,
  networkType: NetworkType,
}

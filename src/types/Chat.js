// @flow

export type ProfileType = {
  name: string,
  location: string,
  image: string,
  identity_pub_key: string,
  ethereum_pub_Key: string,
  chat_id_key: string,
  timestamp: Date,
  version: number,
  identity_key_signature: string,
  ethereum_key_signature: string
};

export type ProfileType = {
  one_time_pre_key: string,
  private_part: Object
};

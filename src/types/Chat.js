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

export type SecretType = {
  one_time_pre_key: string,
  private_part: Object
};

export type DAppMessageType = {
  dapp_id: string,
  type: string,
  group_id: string,
  params: string,
  should_send: boolean,
  should_render: boolean,
};

export type MessageType = {
  type: string,
  send_at: Date,
  additional_data: string,
  shared_secret: SecretType,
  dapp_message: DAppMessageType,
  human_message: string,
  signature: string,
  used_secret: string,
  identity_pub_key: string,
  outgoing: boolean,
};

export type ChatSessionType = {
  publicKey: string,
  username: string,
  accountId: string,
  messages: Array<MessageType>,
};

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

export type GiftedChatUserType = {
  _id: string,
  name: string,
};

export type DAppMessageType = {
  dapp_public_key: string,
  type: string,
  params: Object,
  should_send: boolean,
};

export type GiftedChatMessageType = {
  _id: string,
  text: string,
  createdAt: Date,
  user: GiftedChatUserType,
  dAppMessage: DAppMessageType | null,
};

export type ChatSessionType = {
  publicKey: string,
  username: string,
  accountId: string,
  messages: Array<GiftedChatMessageType>
};


// @flow

export type ProfileType = {
  name: string,
  location: string,
  image: string,
  identityKey: string,
  ethereumAddress: string,
  ethereumPublicKey: string,
  chatIdKey: string,
  timestamp: Date,
  version: number,
  identityKeySignature: string,
  ethereumKeySignature: string
};

export type GiftedChatUserType = {
  _id: string,
};

export type DAppMessageType = {
  dAppPublicKey: string,
  type: string,
  params: Object,
  shouldSend: boolean,
};

export type GiftedChatMessageType = {
  _id: string,
  text: string,
  createdAt: Date,
  user: GiftedChatUserType,
  dAppMessage: DAppMessageType | null,
};

export type ChatType = {
  id: number,
  // Identity keys of members
  members: Array<string>,
  accountId: string,
  messages: Array<GiftedChatMessageType>,
  name: string | null,
  unreadMessages: boolean,
};

export type PanthalassaChatType = {
  chat_id: number,
  // For single partner chat
  chat_partner: string | null,
  // For group chat
  partners: Array<string> | null,
  group_chat_name: string,
  unread_messages: boolean,
};

export type PanthalassaMessage = {
  db_id: string,
  received: boolean,
  dapp: string,
  content: string,
  sender: string,
  created_at: number,
}

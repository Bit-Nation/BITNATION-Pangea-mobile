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
  name: string,
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

export type ChatSessionType = {
  publicKey: string,
  profile: ProfileType,
  accountId: string,
  messages: Array<GiftedChatMessageType>
};


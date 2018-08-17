// @flow

export type DApp = {
  name: string,
  publicKey: string,
}

export type PanthalassaDApp = {
  name: { [string]: string },
  code: string,
  used_signing_key: string,
  signature: string,
  engine: {
    major: number,
    minor: number,
    patch: number,
  },
  version: number,
}

export type DAppModalInfo = {
  layout: Object,
  modalID: string,
  dAppPublicKey: string,
}

export type DAppChatContext = {
  /**
   * @desc Account of current user.
   */
  account: {
    /**
     * @desc Name of the user.
     */
    name: string,
    /**
     * @desc Identity key of the user, hex encoded.
     */
    identityKey: string,
    /**
     * @desc Address of ethereum wallet of the user.
     */
    ethereumAddress: string,
  },
  /**
   * @desc Chat partner information
   */
  partner: {
    /**
     * @desc Name of chat partner.
     */
    name: string,
    /**
     * @desc Identity key of chat partner, hex encoded.
     */
    identityKey: string,
    /**
     * @desc Address of ethereum wallet of chat partner.
     */
    ethereumAddress: string,
  },
}

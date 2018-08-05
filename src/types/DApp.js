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

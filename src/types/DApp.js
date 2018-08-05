// @flow

export type DApp = {
  name: { [string]: string },
  code: string,
  publicKey: string,
  signature: string,
  engine: {
    major: number,
    minor: number,
    patch: number,
  },
  version: number,
}

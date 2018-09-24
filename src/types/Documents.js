// @flow

export type Document = {
  id: number,
  name: string,
  description: string,
  txHash: string | null,
  signature: string,
  registered?: string,
  docHash?: string,
  status?: string,
  dataId: string,
  mimeType: string,
}

export type EditingDocument = {
  id: number | null,
  name: string,
  description: string,
  dataId: string,
  mimeType: string,
}

export type PanthalassaDocument = {
  id: number,
  title: string,
  mime_type: string,
  content: string,
  description: string,
  tx_hash: string,
  hash: string,
  signature: string,
}

export type PanthalassaInputDocument = {
  id: number,
  title: string,
  mime_type: string,
  content: string,
  description: string,
}

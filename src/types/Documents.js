// @flow

export type Document = {
  id: string,
  name: string,
  description: string,
  data: string,
  mimeType: string,
}

export type EditingDocument = {
  name: string,
  description: string,
  data: string | null,
  mimeType: string,
}

// @flow

export type Document = {
  id: number,
  name: string,
  description: string,
  data: string,
  mimeType: string,
}

export type EditingDocument = {
  id: number | null,
  name: string,
  description: string,
  data: string | null,
  mimeType: string,
}

export type PanthalassaDocument = {
  id: number,
  title: string,
  mime_type: string,
  content: string,
}
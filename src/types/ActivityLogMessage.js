// @flow

export type ActivityLogMessage = {
  id: number,
  msg: string,
  params: string,
  interpret: boolean,
  created_at: Date
};

// @flow

export type ActivityLogMessage = {
  id: number,
  accountId: string,
  msg: string,
  params: string,
  interpret: boolean,
  created_at: Date
};

// @flow

export type ActivityLogMessage = {
  id: number,
  accountId: string,
  msg: string,
  params: string,
  interpret: boolean,
  createdAt: Date
};

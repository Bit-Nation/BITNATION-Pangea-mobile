export type MessageKeyType = {
    messageKey: string,
    messageNumber: number,
  }
export type DoubleRatchetKeyType = {
    accountId: string,
    doubleRatchetKey: string,
    messageKeys: Array<MessageKeyType>
  }

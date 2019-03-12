import {
  convertToDatabase,
  convertFromDatabase,
} from '../activity-utils';

describe('convert message to database', () => {
  test('required params only', () => {
    const msgObj = {
      id: '3409543',
      accountId: '12345',
      msg: 'test message',
      params: '',
      interpret: true,
      createdAt: new Date(),
    };

    expect(convertToDatabase(msgObj)).toEqual({
      id: msgObj.id,
      accountId: '12345',
      heading: '',
      msg: msgObj.msg,
      params: msgObj.params,
      version: 1,
      display: true,
      interpret: msgObj.interpret,
      createdAt: msgObj.createdAt,
    });
  });
});

describe('convert message from database', () => {
  test('simple', () => {
    const message = {
      id: 'testmessage',
      accountId: '12345',
      heading: '',
      msg: 'test Message',
      params: '',
      version: 1,
      display: true,
      interpret: true,
      createdAt: '737545435435',
    };

    expect(convertFromDatabase(message)).toEqual({
      id: message.id,
      accountId: '12345',
      msg: message.msg,
      params: message.params,
      interpret: message.interpret,
      createdAt: message.createdAt,
    });
  });
});


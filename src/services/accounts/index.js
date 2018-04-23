// @flow

export default class AccountsService {
  static checkPassword(accountId: string, password: string): boolean {
    // @todo Add check for password correctness.
    return password.length > 0;
  }
}

// @flow

export default class EthereumService {
  static async sendMoney(fromAddress: string, toAddress: string, amount: string): Promise<void> {
    console.log('CALL!');
    console.log(fromAddress);
    console.log(toAddress);
    console.log(amount);
    // @todo Implement
  }
}

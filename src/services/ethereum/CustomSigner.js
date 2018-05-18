const ethers = require('ethers');

export default class CustomSigner extends ethers.Wallet {
  constructor() {
    super();
    // @TODO fetch the address form panthalassa
    this.address = '0x0';
  }

  sign(transaction) {
    // @TODO fetch private key here - this way we make sure that it's not in the state of the application
    throw new Error();
  }
}

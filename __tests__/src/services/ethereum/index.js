import Ethereum from '../../../../src/services/ethereum/index';

describe('ethereum', () => {
  test('check test', async () => {
    const ethereum = new Ethereum();
    await ethereum.initializeWallet();
    console.log('initialized wallet');
  });
});

import ethereum from '../../../../src/services/ethereum/index';

describe('ethereum', () => {
  test('check test', async () => {
    await ethereum.initializeWallet();
    console.log('initialized wallet');
  });
});

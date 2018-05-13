import Ethereum from '../../../../src/services/ethereum/index';

describe('ethereum', () => {
  let ethereum;
  beforeAll(() => {
    ethereum = new Ethereum();
  });
  test('Initialize wallet', async () => {
    await ethereum.initializeWallet();
    console.log('initialized wallet');
  });
  test('Send ether', async () => {
    await ethereum.sendMoney('0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290', '1.0', '2000000000')
  });
});

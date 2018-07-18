import { self } from 'react-native-threads';
import Ethereum from './src/services/ethereum';

self.onmessage = async (data) => {
  const jsonConfigData = JSON.parse(data);
  let { expectedNationsNumber } = jsonConfigData;
  const { wallet } = jsonConfigData;
  const { network } = jsonConfigData;
  const ethereumService = new Ethereum(wallet, network);
  const logs = [];
  ethereumService.nations.onnationcreated = async function processLog() {
    // BE CAREFUL! Since strange API of ether.js log passed here as a 'this'.
    const log = this;

    logs.push({ idInSmartContract: log.args.nationId.toNumber(), txHash: log.transactionHash });
    expectedNationsNumber -= 1;
    if (expectedNationsNumber === 0) {
      self.postMessage(JSON.stringify(logs));
    }
  };
};

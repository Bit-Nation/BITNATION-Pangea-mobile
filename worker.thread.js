import { self } from 'react-native-threads';
import ServiceContainer from './src/services/container';

self.onmessage = async (data) => {
  const jsonConfigData = JSON.parse(data);
  let { expectedNationsNumber } = jsonConfigData;
  const { ethereumService } = ServiceContainer;
  const logs = [];
  console.log('[TEST] On message here');
  ethereumService.nations.onnationcreated = async function processLog() {
    console.log(`[TEST] Process ${this.transactionHash}`);

    // BE CAREFUL! Since strange API of ether.js log passed here as a 'this'.
    const log = this;

    logs.push({ idInSmartContract: log.args.nationId.toNumber(), txHash: log.transactionHash });
    expectedNationsNumber -= 1;
    if (expectedNationsNumber === 0) {
      self.postMessage(JSON.stringify(logs));
    }
  };

  if (expectedNationsNumber === 0) {
    self.postMessage(JSON.stringify(logs));
  }
};

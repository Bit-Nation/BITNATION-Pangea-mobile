import ethers from 'ethers';
import { NativeEventEmitter, NativeModules } from 'react-native';
// Javascript static code of the proto file
import { api_proto } from './compiledRequest';
import compiledResponse from './compiledResponse';
import EthereumService from '../ethereum';

const { Panthalassa } = NativeModules;
const { Response } = compiledResponse.api_proto;

export default class UpstreamService {
  eventsSubscription;
  request;
  ethereumService: EthereumService;
  constructor(ethereumService: EthereumService) {
    this.ethereumService = ethereumService;
    const emitter = new NativeEventEmitter(Panthalassa);
    this.eventsSubscription = emitter.addListener(
      'PanthalassaUpStream',
      request => this.handleRequest(request),
    );
    this.request = { api_proto };
  }
  handleRequest = (request) => {
    const decoded = this.request.decode(request).finish();
    if (decoded.dRKeyStoreGet !== null) {
      this.handleDRKeyStoreGet(
        decoded.dRKeyStoreGet.drKey,
        decoded.dRKeyStoreGet.messageNumber,
      );
    } else if (decoded.dRKeyStorePut !== null) {
      this.handleDRKeyStorePut(
        decoded.dRKeyStorePut.key,
        decoded.dRKeyStorePut.messageNumber,
        decoded.dRKeyStorePut.messageKey,
      );
    } else if (decoded.dRKeyStoreDeleteMK !== null) {
      this.handleDRKeyStoreDeleteMK(
        decoded.dRKeyStoreDeleteMK.key,
        decoded.dRKeyStoreDeleteMK.msgNum,
      );
    } else if (decoded.dRKeyStoreDeleteKeys !== null) {
      this.handleDRKeyStoreDeleteKeys(decoded.dRKeyStoreDeleteKeys.key);
    } else if (decoded.dRKeyStoreDeleteKeys !== null) {
      this.handleDRKeyStoreCount(decoded.dRKeyStoreDeleteKeys.key);
    } else if (decoded.ShowModal !== null) {
      this.handleShowModal(decoded.ShowModal.title, decoded.ShowModal.layout);
    } else if (decoded.SendEthereumTransaction !== null) {
      this.handleSendEthereumTransaction(decoded.requestId, decoded.SendEthereumTransaction.value, decoded.SendEthereumTransaction.to, decoded.SendEthereumTransaction.data);
    } else {
      this.handleErrorMessage();
    }
  };
  handleDRKeyStoreGet = (drKey, messageNumber) => {};
  handleDRKeyStorePut = (key, messageNumber, messageKey) => {};
  handleDRKeyStoreDeleteMK = (key, msgNum) => {};
  handleDRKeyStoreDeleteKeys = (key) => {};
  handleDRKeyStoreCount = (key) => {};
  handleShowModal = (title, layout) => {};
  handleSendEthereumTransaction = (id, value, to, data) => {
    const transaction = {
      to,
      data,
      value: ethers.utils.parseEther(value),
    };
    this.ethereumService.wallet.sendTransaction(transaction)
      .then((txDetails) => {
        Panthalassa.PanthalassaSendResponse({
          id,
          data: Response.encode({
            sendEthereumTransaction: {
              nonce: txDetails.nonce,
              gasPrice: txDetails.gasPrice.toString(),
              gasLimit: txDetails.gasLimit.toString(),
              value: txDetails.value.toString(),
              to: txDetails.to,
              data: txDetails.data,
              chainId: txDetails.chainId,
              from: txDetails.from,
              hash: txDetails.hash,
            },
          }).finish(),
          error: '',
          timeout: 1,
        });
      })
      .catch((err) => {
        Panthalassa.PanthalassaSendResponse({
          id,
          data: {},
          error: err,
          timeout: 1,
        });
      });
  };
  handleErrorMessage = () => {};
  unsubscribe = () => {
    if (this.eventsSubscription) {
      // this.eventsSubscription.remove();
    }
  };
}

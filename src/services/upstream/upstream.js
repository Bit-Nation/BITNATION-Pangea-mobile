import ethers from 'ethers';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { Buffer } from 'buffer';
// Javascript static code of the proto file
import { api_proto as apiProto } from './compiled';

import EthereumService from '../ethereum';
import DAppsService from '../dapps';
import type { DApp } from '../../types/DApp';

const { Panthalassa } = NativeModules;
const { Response, Request } = apiProto;

export default class UpstreamService {
  eventsSubscription;

  ethereumService: EthereumService;
  constructor(ethereumService: EthereumService) {
    this.ethereumService = ethereumService;
    const emitter = new NativeEventEmitter(Panthalassa);
    this.eventsSubscription = emitter.addListener(
      'PanthalassaUpStream',
      request => this.handleRequest(request),
    );
  }
  handleRequest = (request) => {
    try {
      const decoded = Request.decode(Buffer.from(request.upstream, 'base64'));

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
      } else if (decoded.showModal !== null) {
        this.handleShowModal(decoded.showModal.title, decoded.showModal.layout);
      } else if (decoded.sendEthereumTransaction !== null) {
        this.handleSendEthereumTransaction(decoded.requestId, decoded.sendEthereumTransaction.value, decoded.sendEthereumTransaction.to, decoded.sendEthereumTransaction.data);
      } else if (decoded.saveDApp !== null) {
        this.handleSaveDApp(decoded.saveDApp);
      } else {
        this.handleErrorMessage();
      }
    } catch (e) {
      console.log('====================================');
      console.log('error =', e);
      console.log('====================================');
    }
  };
  handleDRKeyStoreGet = (drKey, messageNumber) => {};
  handleDRKeyStorePut = (key, messageNumber, messageKey) => {};
  handleDRKeyStoreDeleteMK = (key, msgNum) => {};
  handleDRKeyStoreDeleteKeys = (key) => {};
  handleDRKeyStoreCount = (key) => {};
  handleShowModal = (title, layout) => {};
  handleSaveDApp = async (saveDApp) => {
    const dApp: DApp = {
      name: saveDApp.appName,
      code: saveDApp.code,
      publicKey: saveDApp.signingPublicKey,
      signature: saveDApp.signature,
    };
    // @todo Save DApp
    await DAppsService.startDApp(dApp);
    await DAppsService.openDApp(saveDApp.signingPublicKey, {});
  };
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
              v: txDetails.v,
              r: txDetails.r,
              s: txDetails.s,
            },
          }).finish(),
          error: '',
          timeout: 20,
        });
      })
      .catch((err) => {
        Panthalassa.PanthalassaSendResponse({
          id,
          data: Response.encode({}),
          error: err,
          timeout: 20,
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

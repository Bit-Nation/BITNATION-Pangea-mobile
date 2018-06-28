import ethers from 'ethers';
import { NativeEventEmitter, NativeModules } from 'react-native';
import _ from 'lodash';
import defaultDB from '../../services/database';

import type { MessageKeyType } from '../../types/Message';

// Javascript static code of the proto file
import { api_proto as apiProto } from './compiled';

import EthereumService from '../ethereum';
import { DatabaseWriteFailed } from '../../global/errors/common';


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
      const decoded = Request.decode(request);

      if (decoded.dRKeyStoreGet !== null) {
        this.handleDRKeyStoreGet({ ...decoded.dRKeyStoreGet });
      } else if (decoded.dRKeyStorePut !== null) {
        this.handleDRKeyStorePut({ ...decoded.dRKeyStorePut });
      } else if (decoded.dRKeyStoreDeleteMK !== null) {
        this.handleDRKeyStoreDeleteMK({
          messageKey: decoded.dRKeyStoreDeleteMK.key,
          messageNumber: decoded.dRKeyStoreDeleteMK.msgNum,
        });
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

   handleDRKeyStoreGet = async ({ messageNumber }) => {
     const db = await defaultDB;
     return db.objects('MessageKey').filtered(`messageNumber == '${messageNumber}'`);
   };
  handleDRKeyStorePut = async ({
    messageKey,
    messageNumber,
  }:MessageKeyType) => {
    const db = await defaultDB;
    try {
      db.write(() => {
        db.create('MessageKey', {
          messageKey,
          messageNumber,
        });
      });
    } catch (error) {
      throw new DatabaseWriteFailed(error);
    }
  };
  handleDRKeyStoreDeleteMK = async ({
    messageKey,
    messageNumber,
  }:MessageKeyType) => {
    const db = await defaultDB;
    const message = db.objects('MessageKey').filtered(`messageKey == '${messageKey}'  AND messageNumber == '${messageNumber}'`);
    try {
      db.write(() => {
        db.delete(message);
      });
    } catch (error) {
      throw new DatabaseWriteFailed(error);
    }
  };
  handleDRKeyStoreDeleteKeys =async (messageKey) => {
    const db = await defaultDB;
    const messages = db.objects('MessageKey').filtered(`messageKey == '${messageKey}'`);
    try {
      db.write(() => {
        db.delete(messages);
      });
    } catch (error) {
      throw new DatabaseWriteFailed(error);
    }
  };
  handleDRKeyStoreCount = async (messageKey) => {
    const db = await defaultDB;
    const messages = db.objects('MessageKey').filtered(`messageKey == '${messageKey}'`);
    return _.size(messages);
  };

  handleShowModal = () => {};
  handleSaveDApp = () => {};
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

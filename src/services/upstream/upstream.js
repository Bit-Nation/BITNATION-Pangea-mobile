// @flow

import ethers from 'ethers';
import { NativeEventEmitter, NativeModules } from 'react-native';
// $FlowFixMe Flow doesn't want to allow import buffer for some reason.
import { Buffer } from 'buffer';
import { Navigation } from 'react-native-navigation';

// Javascript static code of the proto file
import { api_proto as apiProto } from './compiled';

import EthereumService from '../ethereum';
import { screen } from '../../global/Screens';

const { Panthalassa } = NativeModules;
const { Response, Request } = apiProto;

const RESPONSE_TIMEOUT = 20;

export default class UpstreamService {
  eventsSubscription: any;
  ethereumService: EthereumService;
  onUIAPIRequest: ?((data: Object) => void);

  constructor(ethereumService: EthereumService) {
    this.ethereumService = ethereumService;
    this.startListening();
  }

  subscribeToUIAPI(handler: ((data: Object) => void)) {
    this.onUIAPIRequest = handler;
  }

  unsubscribeFromUIAPI() {
    this.onUIAPIRequest = null;
  }

  startListening = () => {
    const emitter = new NativeEventEmitter(Panthalassa);
    this.eventsSubscription = emitter.addListener(
      'PanthalassaUpStream',
      request => this.handleRequest(request),
    );
  };

  handleRequest = async (request: any) => {
    if (request.client != null) {
      return this.handleClientUpstreamRequest(request.client);
    }
    if (request.ui != null) {
      return this.handleUIAPIUpstreamRequest(request.ui);
    }

    return Promise.resolve();
  };

  handleClientUpstreamRequest = async (data: any) => {
    try {
      const decoded = Request.decode(Buffer.from(data, 'base64'));
      console.log(`[PANGEA] Received request ${decoded.requestID}`);

      if (decoded.showModal != null) {
        return this.handleShowModal(decoded.requestID, decoded.showModal);
      } else if (decoded.sendEthereumTransaction != null) {
        return this.handleSendEthereumTransaction(decoded.requestID, decoded.sendEthereumTransaction);
      }
      return this.handleErrorMessage(decoded.requestID, decoded);
    } catch (error) {
      console.log(`[PANGEA] Upstream decode error: ${error}`);
      throw error;
    }
  };

  handleUIAPIUpstreamRequest = async (data: any) => {
    try {
      const parsed = JSON.parse(data);
      if (typeof this.onUIAPIRequest === 'function') {
        this.onUIAPIRequest(parsed);
      }
    } catch (error) {
      console.log(`[PANGEA] UI API handle error: ${error}`);
      throw error;
    }
  };

  handleShowModal = (id: string, info: any) => {
    const { uiID, layout, dAppPublicKey: dAppPublicKeyBase64 } = info;
    try {
      const dAppPublicKey = Buffer.from(dAppPublicKeyBase64, 'base64').toString('hex');
      const JSONLayout = JSON.parse(layout);
      // Add type for root component.
      JSONLayout.type = 'view';

      Navigation.showModal({
        ...screen('DAPP_MODAL_SCREEN'),
        passProps: {
          layout: JSONLayout,
          dAppPublicKey,
          uiID,
        },
      });
      return this.sendSuccessResponse(id, {});
    } catch (error) {
      return this.sendErrorResponse(id, error);
    }
  };

  handleSendEthereumTransaction = async (id: string, info: any) => {
    const { value, to, data } = info;

    const transaction = {
      to,
      data,
      value: ethers.utils.parseEther(value),
    };
    try {
      const txDetails = await this.ethereumService.wallet.sendTransaction(transaction);
      return this.sendSuccessResponse(id, {
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
      });
    } catch (error) {
      return this.sendErrorResponse(id, error);
    }
  };

  handleErrorMessage = async (id: string, info: any) => {
    console.log(`[ERROR] Unknown upstream request ${info}`);
    return this.sendErrorResponse(id, new Error(`Unknown upstream request ${info}`));
  };

  cleanUp() {
    if (this.eventsSubscription != null) {
      this.eventsSubscription.remove();
    }
  }

  // Common functions

  sendErrorResponse = async (id: string, error: Error) => {
    console.log(`[PANGEA] Upstream error response: ${id}, error: ${error.message}`);
    try {
      return Panthalassa.PanthalassaSendResponse({
        id,
        data: Buffer.from(Response.encode({}).finish()).toString('utf8'),
        responseError: error.message,
        timeout: RESPONSE_TIMEOUT,
      });
    } catch (sendError) {
      console.log(`[PANGEA] Upstream failed to send fail response: ${id}, error: ${sendError.message}`);
      throw sendError;
    }
  };

  sendSuccessResponse = async (id: string, data: any) => {
    console.log(`[PANGEA] Upstream success response: ${id}`);
    try {
      return Panthalassa.PanthalassaSendResponse({
        id,
        data: Buffer.from(Response.encode(data).finish()).toString('utf8'),
        responseError: '',
        timeout: RESPONSE_TIMEOUT,
      });
    } catch (sendError) {
      console.log(`[PANGEA] Upstream failed to send success response: ${id}, error: ${sendError.message}`);
      throw sendError;
    }
  };
}

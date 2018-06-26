import { NativeEventEmitter, NativeModules } from 'react-native';
// Javascript static code of the proto file
import { api_proto } from './compiledRequest';

const { Panthalassa } = NativeModules;

export default class UpstreamService {
  eventsSubscription;
  request;
  constructor() {
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
  unsubscribe = () => {
    if (this.eventsSubscription) {
      // this.eventsSubscription.remove();
    }
  };
}

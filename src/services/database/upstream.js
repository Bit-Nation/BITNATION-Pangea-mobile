import { NativeEventEmitter, NativeModules } from 'react-native';
// Javascript static code of the proto file
import { Request } from './compiledReqeust';

const { Panthalassa } = NativeModules;


export default class UpstreamService {
  eventsSubscription;
  constructor() {
    const emitter = new NativeEventEmitter(Panthalassa);

    this.eventsSubscription = emitter.addListener(
      'RequestEvent',
      (request) => this.handleRequest(request),
    );
  };
  handleRequest = (request) => {
    const decoded = Request.decode(request);
    if (decoded.DRKeyStoreGet !== null) {
      this.handleDRKeyStoreGet(decoded.DRKeyStoreGet.drKey, decoded.DRKeyStoreGet.messageNumber);
    } else if (decoded.DRKeyStorePut !== null) {
      this.handleDRKeyStorePut(decoded.DRKeyStorePut.key, decoded.DRKeyStorePut.messageNumber, decoded.DRKeyStorePut.messageKey);
    } else if (decoded.DRKeyStoreDeleteMK !== null) {
      this.handleDRKeyStoreDeleteMK(decoded.DRKeyStoreDeleteMK.key, decoded.DRKeyStoreDeleteMK.msgNum);
    } else if (decoded.DRKeyStoreDeleteKeys !== null) {
      this.handleDRKeyStoreDeleteKeys(decoded.DRKeyStoreDeleteKeys.key);
    } else if (decoded.DRKeyStoreDeleteKeys !== null) {
      this.handleDRKeyStoreCount(decoded.DRKeyStoreDeleteKeys.key);
    } else if (decoded.ShowModal !== null) {
      this.handleShowModal(decoded.ShowModal.title, decoded.ShowModal.layout);
    }
  };
  handleDRKeyStoreGet = (drKey, messageNumber) => {

  };
  handleDRKeyStorePut = (key, messageNumber, messageKey) => {

  };
  handleDRKeyStoreDeleteMK = (key, msgNum) => {

  };
  handleDRKeyStoreDeleteKeys = (key) => {

  };
  handleDRKeyStoreCount = (key) => {

  };
  handleShowModal = (title, layout) => {

  };
  unsubscribe = () => {
    this.eventsSubscription.remove();
  };
}

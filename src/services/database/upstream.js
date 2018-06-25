import { NativeEventEmitter, NativeModules } from 'react-native';
import protobuf from 'protobufjs';

const { Panthalassa } = NativeModules;


export default class UpstreamService {
  eventsSubscription;
  constructor() {
    const emitter = new NativeEventEmitter(Panthalassa);

    this.eventsSubscription = emitter.addListener(
      'RequestEvent',
      (request) => this.handleRequest(request),
    );
  }
  handleRequest = request => {

  }
  unsubscribe = () => {
    this.eventsSubscription.remove();
  }
}

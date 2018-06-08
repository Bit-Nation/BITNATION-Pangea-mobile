/* eslint-disable */
'use strict';
const ether = require('ethers');
const EventEmitter = require('eventemitter3');
const uuid = require('uuid4');
const ReconnectingWebSocket = require('reconnecting-websocket');

const JsonRpcProvider = require('ethers/providers/json-rpc-provider');

const defineProperty = require('ethers/utils/properties').defineProperty;
const errors = require('ethers/utils/errors');

function WebSocketProvider(network) {
    errors.checkNew(this, WebSocketProvider);

    if (network == null) {
        errors.throwError('missing network', errors.MISSING_ARGUMENT, { arg: 'path' });
    }

    let url;
    switch (network) {
        case 'rinkeby' : {
            url = 'wss://rinkeby.infura.io/_ws';
            break
        }
        case 'homestead' : {
            url = 'wss://mainnet.infura.io/_ws';
            break
        }
        default : {
            throw new Error(`Network: ${network} is not supported`)
        }
    }

    JsonRpcProvider.call(this, url, network);

    const webSocket = (() => {
        const ws = new ReconnectingWebSocket(url, null, { reconnectInterval: 3000 });

        ws.onmessage = (e) => {
            const event = JSON.parse(e.data.toString('utf8')).result;
            this.eventEmitter.emit(JSON.parse(e.data).id, event);
        };

        ws.onerror = (e) => {
            console.log(e.message);
        };

        return ws;
    })();

    defineProperty(this, 'webSocketUrl', url);
    defineProperty(this, 'eventEmitter', new EventEmitter());
    defineProperty(this, 'webSocket', webSocket)
}
JsonRpcProvider.inherits(WebSocketProvider);

const onOpenClosePromiseBuilder = (ws) => new Promise((res, rej) => {
  if (ws.readyState === WebSocket.OPEN) {
    res(ws);
  }
  const onOpenHandler = () => {
    console.log(`connected to websocket`);
    ws.removeEventListener('open', onOpenHandler);
    ws.removeEventListener('close', onCloseHandler);
    res(ws);
  };
  const onCloseHandler = (e) => {
    console.log(`disconnected from websocket`);
    ws.removeEventListener('open', onOpenHandler);
    ws.removeEventListener('close', onCloseHandler);
    rej(new Error(e.message));
  };
  ws.addEventListener('open', onOpenHandler);
  ws.addEventListener('close', onCloseHandler);
});

defineProperty(WebSocketProvider.prototype, 'send', function(method, params) {

    const id = uuid();

    const payload = JSON.stringify({
        method: method,
        params: params,
        id: id,
        jsonrpc: "2.0"
    });

    return new Promise((resolve, reject) => {
        onOpenClosePromiseBuilder(this.webSocket)
          .then((ws) => {
            this.eventEmitter.once(id, (data) => {
              resolve(data);
            });
            ws.send(payload);
          }).catch(reject);
    });
});

module.exports = WebSocketProvider;

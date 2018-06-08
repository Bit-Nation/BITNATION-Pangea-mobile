/* eslint-disable */
'use strict';
const ether = require('ethers');
const EventEmitter = require('eventemitter3');
const uuid = require('uuid4');

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

    const webSocket = () => new Promise((res, rej) => {

        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log(`connected to websocket`);
            res(ws);
        };

        ws.onmessage = (e) => {
            const event = JSON.parse(e.data.toString('utf8')).result;
            this.eventEmitter.emit(JSON.parse(e.data).id, event);
        };

        ws.onerror = (e) => {
            console.log(e.message);
        };

        ws.onclose = (e) => {
            console.log(`websocket error: ${e.message}`);
            setTimeout(() => {
                WebSocketProvider.prototype.webSocketPromise = webSocket();
            }, 1000)
        };

    });

    defineProperty(this, 'webSocketUrl', url);
    defineProperty(this, 'eventEmitter', new EventEmitter());
    defineProperty(this, 'webSocketPromise', webSocket())
}
JsonRpcProvider.inherits(WebSocketProvider);

defineProperty(WebSocketProvider.prototype, 'send', function(method, params) {

    const id = uuid();

    const payload = JSON.stringify({
        method: method,
        params: params,
        id: id,
        jsonrpc: "2.0"
    });

    const self = this;
    return new Promise((resolve, reject) => {

        self
            .webSocketPromise
            .then((ws) => {
                self.eventEmitter.once(id, (data) => {

                    resolve(data);

                });
                ws.send(payload)
            })
            .catch(reject)

    });
});

module.exports = WebSocketProvider;

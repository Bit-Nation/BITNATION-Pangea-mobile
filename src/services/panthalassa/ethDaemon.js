//@flow

import {JsonRpcNodeInterface} from 'BITNATION-Pangea-libs/src/specification/jsonRpcNode'
import config from 'react-native-config';

/**
 * @desc Implementation of the JsonRpcNodeInterface which is used to communicate with the ethereum chain
 * @type {{name: string, url: string, start: function(): *, stop: function(): *}}
 * @alias ethDaemon
 * @todo this is supposed to run a local daemon we had to change this. See here why: https://github.com/Bit-Nation/react-native-eth-daemon/issues/12
 */
const imp:JsonRpcNodeInterface = {
    name: 'Local Ethereum node',
    url: config.ETH_HTTP_ENDPOINT,
    start: () => new Promise((res, rej) => res()),
    stop: () => new Promise((res, rej) => res())
};

export default imp;

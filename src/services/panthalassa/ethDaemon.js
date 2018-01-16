//@flow

import {JsonRpcNodeInterface} from 'BITNATION-Panthalassa/src/specification/jsonRpcNode'
import daemon from 'react-native-eth-daemon';
import config from 'react-native-config';

/**
 * @desc Implementation of the JsonRpcNodeInterface which is used to communicate with the ethereum chain
 * @type {{name: string, url: string, start: function(): *, stop: function(): *}}
 * @alias ethDaemon
 */
const imp:JsonRpcNodeInterface = {
    name: 'Local Ethereum node',
    url: 'localhost:8545',
    start: () => daemon.startDaemon({
        enabledEthereum:true,
        networkID: parseInt(config.ETH_DAEMON_NETWORK_ID),
        enodesNumber:16,
        maxPeers:25,
        enabledWhisper:false
    }),
    stop: () => daemon.stopDaemon()
};

export default imp;

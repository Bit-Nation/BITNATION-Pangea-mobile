//@flow

/**
 * Ethereum daemon implementation
 */

import {JsonRpcNodeInterface} from 'BITNATION-Panthalassa/src/specification/jsonRpcNode'
import daemon from 'react-native-eth-daemon';
import config from 'react-native-config';

const imp:JsonRpcNodeInterface = {
    name: 'Local Ethereum node',
    url: 'localhost:8545',
    start: () => daemon.startDaemon({
        enabledEthereum:true,
        networkID: config.ETH_DAEMON_NETWORK_ID,
        enodesNumber:16,
        maxPeers:25,
        enabledWhisper:false
    }),
    stop: () => daemon.stopDaemon()
};

export default imp;

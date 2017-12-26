//@flow

/**
 * Ethereum daemon implementation
 */

import {JsonRpcNodeInterface} from 'BITNATION-Panthalassa/src/specification/jsonRpcNode'

//@todo Change this to work with the real daemon
export default function () : JsonRpcNodeInterface {

    const imp:JsonRpcNodeInterface = {
        name: 'Ethereum Daemon',
        url: '',
        start: () => new Promise((res, rej) => res()),
        stop: () => new Promise((res, rej) => res())
    };

    return imp;

}
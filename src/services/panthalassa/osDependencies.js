//@flow

//Make buffer available
if(!global.Buffer){
    global.Buffer = require('buffer/').Buffer
}

import {NativeModules} from 'react-native';

const { RNRandomBytes } = NativeModules;

import {OsDependenciesInterface, Crypto} from 'BITNATION-Panthalassa/src/specification/osDependencies'

const cryptoImpl:Crypto = {

    randomBytes: (length:number) => new Promise((res, rej) => {

        RNRandomBytes.randomBytes(length, (err, base64String) => {

            if(err){
                return rej(err);
            }

            res(Buffer.from(base64String, 'base64').toString('hex'));

        })

    })

};

const osDepsImpl:OsDependenciesInterface = {
    crypto: cryptoImpl
};

export default osDepsImpl;

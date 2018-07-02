// @flow

import React from 'react';

export type DAppType = {
    name: string,
    identityPublicKey: string,
    openDApp: (payload:Object, services:Object) => void,
    renderMessage: (payload:Object, services:Object) => Promise<React.Component>
}

const dapps:Array<DAppType> = [];
export default dapps;

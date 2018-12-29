// @flow
/* eslint-disable */

let customData = {};

function isDevBuild() {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
        return true;
    }
}

if (isDevBuild()) {
    console.log('Pangea Development Build Detected.');
    customData = require('./dev.config.json');

    //test
    const foo = customData.launcher.android.emulator_port;
    const bar = 1;
}

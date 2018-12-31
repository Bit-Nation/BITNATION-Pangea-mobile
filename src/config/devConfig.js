// @flow
/* eslint-disable */

const fs = require('fs');

let customData = {};

function isDevBuild() {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
        return true;
    }
}

if (isDevBuild()) {
    console.log('Pangea Development Build Detected.');
    if (!fs.exists('dev.config.json')) {
        console.error("dev.config.json not found. Disabling development config.");return false;
    }
    customData = require('./dev.config.json');

    //test
    const foo = customData.launcher.android.emulator_port;
    const bar = 1;
}

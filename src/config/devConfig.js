/* eslint-disable */
// Flow is not compatible with this file due to the conditional require

const fs = require('fs');

let customData = {};

function isDevBuild() {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
        return true;
    }
}

(() => {
    if (isDevBuild()) {
        console.log('Pangea Development Build Detected.');
        if (!fs.existsSync('dev.config.json')) {
            console.error("dev.config.json not found. Disabling development config.");
            
            return;
        }
        else {
            customData = require('./dev.config.json');
            const foo = customData.launcher.android.emulator_port;
            const bar = 1;
        }
    }
})();

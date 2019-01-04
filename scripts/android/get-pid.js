/* eslint-disable */

const fs = require('fs');
var appRoot = require('app-root-path');

const statusFilePath = `${appRoot.toString()}/data/android-status.json`;
const statusFile = fs.readFileSync(statusFilePath);
const status = JSON.parse(statusFile);

console.log(status.appPid);

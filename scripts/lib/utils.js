/* eslint-disable */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const jsyaml = require('js-yaml');
var appRoot = require('app-root-path');

const DIR = __dirname+"/../";

const bashLoc = childProcess.execFileSync('which', ['bash']).toString().trim();

let initComplete = false;
let cfg = {};

function init() {
    //Sanity check for appRoot
    if (!fs.existsSync(appRoot + "/package.json")) {
        throw new Exception("Could not find package.json");
    }

    //Setup temp dirs
    function makeDir(dir) {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }
    makeDir(appRoot + '/data');
    makeDir(appRoot + '/data/logs');

    //Sanity check before loading .dev.config.yaml
    Utils.RunShellScript('check-env.sh', 'run single dev_config');
    cfg = jsyaml.load(
        fs.readFileSync(appRoot + "/.dev.config.yaml").toString());

    initComplete = true;
}

const Utils = {
    RepositoryRootDir: appRoot.toString(),
    ShellLocation: bashLoc,

    GetDevConfig: function() {
        return cfg;
    },

    RunShellCmd: function(cmd, args) {
        if (args === undefined) {
            args = '';
        }
        
        cmd = `${cmd} ${args}`
        
        const output = childProcess.execSync(cmd, {
            shell: bashLoc,
            stdio: "inherit" //ensure that /dev/tty pipes to stdout
        });
    },

    /**
     * Runs a shell script from relative location, rooted in /scripts folder. 
     * Throws if the command exits other than 0
     * args is a string
     */
    RunShellScript: function(script_relative, args) {
        if (args === undefined) {
            args = '';
        }
        
        location = path.normalize(DIR + script_relative);
        this.RunShellCmd(location, args)
    }
};

if (!initComplete) {
    init();
}

module.exports = Utils;
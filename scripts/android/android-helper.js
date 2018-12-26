/* eslint-disable */

/* 
  

  Usage: logger-redirect.js [device(optional)]
  When device id is specified, will redirect log for that device.
  Otherwise, will use the devive name specified in android_emulator_name
   (from .dev.config.yaml)

  Logs will be found in $RepoRoot/data/logs/
*/

const fs = require('fs');
const utils = require('../lib/utils');
const process = require('process');
const childProcess = require('child_process');

const DIR = __dirname;

//Sanity check
utils.RunShellScript('check-env.sh', 'run single adb_present');
utils.RunShellScript('check-env.sh', 'run single android_home');
utils.RunShellScript('check-env.sh', 'run single dev_config');

class AndroidHelper {
    constructor(device) {
        if (device === undefined) {
            console.log('No device name passed to AndroidHelper. Falling back to android_emulator_name in .dev.config.yaml');
            device = utils.GetDevConfig('android_emulator_name');
        }
        this.device = device;
        console.log('Spawned AndroidHelper for device ' + device);
    }
    
    /// Ensures that .dev.config.yaml is committed to the development build
    // There are two (planned) ways that the .dev.config.yaml file are read at runtime.
    // The first way, using this method, is simpler with fewer moving parts
    // However, it only updates the config when this script is run.
    installDevConfig() {
        //https://stackoverflow.com/a/36974021/881111
        var inputfile = `${utils.RepositoryRootDir}/.dev.config.yaml`,
            outputfile = `${utils.RepositoryRootDir}/src/config/.dev.config.json`,
            yaml = require('js-yaml'),
            fs = require('fs'),
            obj = yaml.load(fs.readFileSync(inputfile, {encoding: 'utf-8'}));
        console.log(`AndroidHelper: Copying ${inputfile} to ${outputfile}`);
        fs.writeFileSync(outputfile, JSON.stringify(obj, null, 2));
    }

    launchApp() {
        console.log(`AndroidHelper: Launching flow.`);
        let procopts = {
            cwd: utils.RepositoryRootDir,
            shell: utils.ShellLocation,
            stdio: "inherit"
        };
        childProcess.execSync('flow', procopts);

        childProcess.execSync(`${utils.RepositoryRootDir}/node_modules/.bin/react-native run-android`, procopts);

      //  utils.RunShellCmd('npm', ['run', 'android']);
    }

   /* 
    Redirects log output
    Original story: https://www.pivotaltracker.com/story/show/162820053

    Currently, all logging data on Pangea-Mobile is accessible on the device
    itself via logcat. This data needs to be piped to a file on the development
    host, so that other applications such as a log parser can work with that
    file (making the log data more readily accessible to any developer working
    with the project).
    */
    redirectLog() {
        console.log(`AndroidHelper: Redirecting log output from device ${this.device}.`);
        var logStream = fs.createWriteStream(utils.RepositoryRootDir + `/data/logs/${this.device}.log`, {flags: 'a'});
        let logcat = childProcess.spawn('adb', ['-s', this.device, 'logcat']);
        logcat.stdout.pipe(logStream);
        logcat.stderr.pipe(logStream);
    }

    startEmulator() {
        childProcess.spawn('$ANDROID_HOME/tools/emulator', [`-avd ${this.device}`], {
            shell: utils.ShellLocation,
            stdio: "inherit"
        });
    }

    startAll() {
        this.installDevConfig();
        this.startEmulator();
        this.redirectLog();
        this.launchApp();
    }
}

module.exports = { AndroidHelper: AndroidHelper };

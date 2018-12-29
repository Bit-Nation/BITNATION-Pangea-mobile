/* eslint-disable */

/* 
  

  Usage: logger-redirect.js [device(optional)]
  When device id is specified, will redirect log for that device.
  Otherwise, will use the devive name specified in android_emulator_name
   (from .dev.config.yaml)

  Logs will be found in $RepoRoot/data/logs/
*/

const fs = require('fs');
const os = require('os');
const utils = require('../lib/utils');
const process = require('process');
const childProcess = require('child_process');
const sleep = require('thread-sleep');
const DIR = __dirname;

//Sanity check
utils.RunShellScript('check-env.sh', 'run single adb_present');
utils.RunShellScript('check-env.sh', 'run single android_home');
utils.RunShellScript('check-env.sh', 'run single dev_config');

class AndroidHelper {
    constructor(device) {
        this.cfg = utils.GetDevConfig().launcher;
        this.androidcfg = this.cfg.android;
        if (device === undefined) {
            console.log('No device name passed to AndroidHelper. Falling back to android_emulator_name in .dev.config.yaml');
            device = this.androidcfg.emulator_name;
        }
        this.deviceName = device;
        console.log('Spawned AndroidHelper for device ' + device);
    }

    findDeviceAddress() {
        function getAllDeviceAddresses() {
            const err = new Error("Unable to find device address.");
            const rawResult = 
                childProcess
                .execSync("adb devices")
                .toString()
                .trim()
                .split(os.EOL);
            if (rawResult[0] != "List of devices attached") {
                throw err;
            }
            let results = [];
            for(let i = 1; i < rawResult.length; i++) {
                results.push(rawResult[i].split('\t')[0]);
            }
            return results;
        }
        const deviceAddresses = getAllDeviceAddresses();

        function deviceIsOurDevice(deviceAddress, portCfg) { 
            return portCfg == parseInt(deviceAddress.split('-')[1]);
        }        

        let matches = deviceAddresses.filter(addr => 
            addr.split('-')[1] == this.androidcfg.emulator_port);
        if (matches.length != 1) {
            throw new Error(
                "Unable to find avd device. If this problem persists, try " +
                "shutting down any currently running emulators before running" +
                " this script.");
        }

        this.deviceAddress = matches[0];
        return this.deviceAddress;
    }
    
    /// Ensures that .dev.config.yaml is committed to the development build
    // There are two (planned) ways that the .dev.config.yaml file are read at runtime.
    // The first way, using this method, is simpler with fewer moving parts
    // However, it only updates the config when this script is run.
    installDevConfig() {
        //https://stackoverflow.com/a/36974021/881111
        var inputfile = `${utils.RepositoryRootDir}/.dev.config.yaml`,
            outputfile = `${utils.RepositoryRootDir}/src/config/dev.config.json`,
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
        console.log(`AndroidHelper: Redirecting log output from device ${this.deviceName}.`);
        var logStream = fs.createWriteStream(utils.RepositoryRootDir + `/data/logs/${this.deviceName}.log`, {flags: 'a'});
        let logcat = childProcess.spawn('adb', ['-s', this.deviceAddress, 'logcat']);
        logcat.stdout.pipe(logStream);
        logcat.stderr.pipe(logStream);
    }

    startEmulator() {
        const port = this.androidcfg.emulator_port;

        console.log("AndroidHelper: Starting Android Emulator");
        const proc = childProcess.spawn(
            '$ANDROID_HOME/tools/emulator', 
            [
                '-avd',  
                `${this.deviceName}`,
                '-port',
                port
            ], 
            {
                shell: utils.ShellLocation,
                stdio: "inherit"
            });
        sleep(1000);
    }

    startAll() {
        this.installDevConfig();
        this.startEmulator();
        this.findDeviceAddress();
        this.redirectLog();
        this.launchApp();
    }
}

module.exports = { AndroidHelper: AndroidHelper };

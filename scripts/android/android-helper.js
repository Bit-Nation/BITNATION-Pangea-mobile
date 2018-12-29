/* eslint-disable */
// TODO: Convert this to typescript per Mark and launch using ts-node

/* 
  

  Usage: logger-redirect.js [device(optional)]
  When device id is specified, will redirect log for that device.
  Otherwise, will use the devive name specified in android_emulator_name
   (from .dev.config.yaml)

  Logs will be found in $RepoRoot/data/logs/
*/

const fs = require('fs');
const os = require('os');
const nodeutil = require('util'); // prefixed with node as 'utils' is our own utils script
const process = require('process');
const childProcess = require('child_process');
const sleep = require('thread-sleep');
const utils = require('../lib/utils');

const DIR = __dirname;

//Sanity check
utils.RunShellScript('check-env.sh', 'run single adb_present');
utils.RunShellScript('check-env.sh', 'run single android_home');
utils.RunShellScript('check-env.sh', 'run single dev_config');

const statusFilePath = `${utils.RepositoryRootDir}/data/android-status.json`;

class StatusDoc {
    constructor() {
        this.timeLaunched = Date.now();
        this.appPid = 0;
    }
}
class AndroidHelper {
    constructor(device) {
        this.statusDoc = new StatusDoc();
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
    
    // Ensures that .dev.config.yaml is committed to the development build
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

        childProcess.spawn(
            `${utils.RepositoryRootDir}/node_modules/.bin/react-native`, 
            ['run-android'], 
            procopts
        );

        this.statusDoc.timeLaunched = Date.now();
        // Todo: child process stdout must be monitored by this script, so its startup completion can be automatically detected
        // If we proceed from this point too soon, we cannot get the app pid. If we proceed too late, the startup is unnecessarily delayed.
        sleep(10000);
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
        const logPath = utils.RepositoryRootDir + '/data/logs/pangea-android-logcat.log';
        console.log(`AndroidHelper: Redirecting log output from device ${this.deviceName} to ${logPath}.`);
        var logStream = fs.createWriteStream(logPath, {flags: 'a'});
        let logcat = childProcess.spawn(
            'adb', 
            [
                '-s', 
                this.deviceAddress,
                'logcat',
                '-v',
                'threadtime'
            ]
        );
        logcat.stdout.pipe(logStream);
        logcat.stderr.pipe(logStream);
    }
    
    // Portable log parser: http://lnav.org/features/
    setupLnav() {
        try {
            utils.RunShellCmd('which lnav');
        }
        catch (err) {
            console.log("AndroidHelper: lnav log utility not detected. Advanced log parsing is disabled. See http://lnav.org/features/ for an overview and installation instructions.");
            return false;
        }
        
        // Install the logcat specification automatically. 
        utils.RunShellCmd(`lnav -i ${utils.RepositoryRootDir}/scripts/android/lnav-logcat.json`);
        
        // Get bitnation app pid. This is necessary in order to filter out irrelevant log data. 
        // We only want log items generated from the pangea app process.
        this.statusDoc.appPid = parseInt(utils.RunShellCmd('adb shell pidof co.bitnation'));
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

        // Give emulator time to launch, so it shows on avd devices list. 
        // If this is not enough time, a configuration override can be added to .dev.config.yaml.
        sleep(1000);
    }

    startAll() {
        this.statusFileRemove();

        this.installDevConfig();
        this.startEmulator();
        this.findDeviceAddress();
        this.redirectLog();

        this.launchApp();

        this.setupLnav();
        this.statusFileCommit();
        /**
         * TODO: 
         * 5. Each distinct tag should have some code to pipe, transform, parse, or redirect the body of the corresponding log lines
         */
    }
    
    statusFileCommit() {
        const doc = nodeutil.inspect(this.statusDoc, )
        fs.writeFileSync(statusFilePath, JSON.stringify(this.statusDoc) , 'utf-8');
    }

    statusFileRemove() {
        if (fs.exists(statusFilePath)) {
            fs.unlinkSync(statusFilePath);
        }
    }
}

module.exports = { AndroidHelper: AndroidHelper };

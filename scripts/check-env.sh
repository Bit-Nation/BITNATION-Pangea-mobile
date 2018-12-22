#!/bin/bash

# Status: Beta (subject to breaking changese)
# Checks the development environment for validity. 
# This script is written purely in bash to minimize dependencies

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"


# The below variables should not need to be changed in this script

# If set to 1, will allow auto correction. Otherwise, report only
SETUPENABLED=1

# when running check_env_all, this will be set to 1 if any of the tests fail
ENVSTATUS=0 


autocorrect() {
    if [ $SETUPENABLED -eq 1 ]; then
        echo "" > /dev/tty

        willcorrect="n"
        read -p "Enter 'y' to correct automatically: " willcorrect
        if [ ! -z $willcorrect ] && [ $willcorrect == "y" ]; then
            return 0
        else
            echo "skipping" > /dev/tty
            echo "" > /dev/tty
            return 1
        fi
    else
        echo "Run 'check-env.sh setup' to correct this." > /dev/tty
        echo "" > /dev/tty
        return 1
    fi
}

check_env_for_inner() { 
    CHECK_ENV_TYPE=$1

    if [ $CHECK_ENV_TYPE == "dev_config" ]; then
        # check if config file exists
        CFGFILE=$DIR/../.dev.config.yaml
        CFGFILEDEFAULT=$DIR/../.dev.config.default.yaml
        if [ ! -f $CFGFILE ]; then
            echo "[FAIL] Config file ${CFGFILE} is not found." > /dev/tty
            if autocorrect; then
                set -x
                cp $CFGFILEDEFAULT $CFGFILE
                set +x
                echo "" > /dev/tty
                return 0
            fi
            return 1
        else
            echo "[PASS] .dev.config.yaml located." > /dev/tty
            return 0
        fi
        # TODO Check $ANDROID_HOME
        # TODO Check .env
        # TODO Check $(which adb)
        # TODO Check npm
        # TODO Check node version
        # TODO Check yarn
    else
        echo "Error: ENV type ${CHECK_ENV_TYPE} not found." > /dev/tty
        return 1
    fi
}

check_env_for() { 
    check_env_for_inner $1
    ENVRESULT=$?

    if [ $ENVRESULT -ne 0 ]; then
        ENVSTATUS=1
    fi
    return $ENVRESULT
}

check_env_all() {
    ENVSTATUS=0
    check_env_for dev_config
    return $ENVSTATUS
}
# check_env can be:
# report: only report, do not auto correct
# auto: Run and prompt the user to correct
check_env() {
    SETUPTYPE=$1

    if [ $SETUPTYPE == "single" ]; then 
        SETUPENABLED=1
        check_env_for $2
        return $?
    elif [ $SETUPTYPE == "report" ]; then
        SETUPENABLED=0
        check_env_all
        return $?
    elif [ $SETUPTYPE == "auto" ]; then
        SETUPENABLED=1
        check_env_all
        return $?
    fi
}



if [ ! -z $1 ] && [ $1 == "run" ]; then
    RESULT=$(check_env $2)
    if [ ! -z $RESULT ] && [ $RESULT == 0 ]; then 
        exit 0
    else
        exit 1
    fi
fi

#!/usr/bin/env bash

# This script starts appropriate android emulator
# TODO: Implement in node

# Usage: start-emulator.sh [device]
# https://developer.android.com/studio/run/emulator-commandline

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

source $DIR/../check-env.sh

check_env single android_home
if [ $? -ne 0 ]; then
    exit 1
fi

check_env single dev_config
if [ $? -ne 0 ]; then
    exit 1
fi

if [ ! -z $1 ]; then
    EMULATOR_NAME=$1
else
    echo "Reading AVD (android_emulator_name) from .dev.config.yaml" > /dev/tty
    EMULATOR_NAME=`$DIR/get-dev-config.sh android_emulator_name`
fi
$ANDROID_HOME/tools/emulator -avd $EMULATOR_NAME

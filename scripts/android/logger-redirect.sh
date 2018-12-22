#!/usr/bin/env bash

# This script redirects log output 

# Original story: https://www.pivotaltracker.com/story/show/162820053

# Currently, all logging data on Pangea-Mobile is accessible on the device 
# itself via logcat. This data needs to be piped to a file on the development 
# host, so that other applications such as a log parser can work with that 
# file (making the log data more readily accessible to any developer working 
# with the project).

# TODO: Implement in node

# Usage: logger-redirect.sh [device]

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

echo "Redirecting log output from device."

source $DIR/../check-env.sh
if [ ! $(check_env single adb_present) ]; then
    exit 1
fi



adb logcat > log-device.txt



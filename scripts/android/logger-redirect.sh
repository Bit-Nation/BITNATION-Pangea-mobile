#!/usr/bin/env bash

# This script redirects log output 

# Original story: https://www.pivotaltracker.com/story/show/162820053

# Currently, all logging data on Pangea-Mobile is accessible on the device 
# itself via logcat. This data needs to be piped to a file on the development 
# host, so that other applications such as a log parser can work with that 
# file (making the log data more readily accessible to any developer working 
# with the project).

# Usage: logger-redirect.sh [device]
echo "Redirecting log output from device."


if [ ! $(which adb) ]; then
    echo "adb command not found. Ensure that the Android SDK is installed and accessible via PATH."
    exit 1
fi

adb logcat > log-device.txt



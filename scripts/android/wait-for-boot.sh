#!/usr/bin/env bash

# first arg must be the device address
adb -s $1 wait-for-device

A=$(adb -s $1 shell getprop sys.boot_completed | tr -d '\r')

while [ "$A" != "1" ]; do
        sleep 2
        A=$(adb -s $1 shell getprop sys.boot_completed | tr -d '\r')
done

adb -s $1 shell input keyevent 82
#!/usr/bin/env bash

#TODO: merge with utility script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"


# Check if bash version is >= $1. Returns 0 if true
v=`bash --version | grep version`
v=`sed -e 's#.*version\(\)#\1#' <<< "$v"`
v=$(echo "${v}" | head -c2)

if [ $v -ge $1 ]; then
    exit 0
else
    exit 1
fi

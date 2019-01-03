#!/usr/bin/env bash

# TODO: merge with utility script

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
    
source $DIR/parse-yaml-bash.sh
create_variables $1
echo "${!2}"

#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

# $(eval "${DIR}/check-bash-version.sh 4") #bash 4 not needed
#if [[ $? -eq 0 ]]; then
    
source $DIR/parse-yaml-bash.sh
create_variables $1
echo "${!2}"

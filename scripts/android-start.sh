#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

#LNAVPRESENT=$(which lnav)
node "${DIR}/android/android-start.js"

#if [ -z $LNAVPRESENT ]; then
    #echo "Pangea has launched. However, log file viewing is disabled, as your #system does not have lnav installed."
    #echo "Please visit http://lnav.org/ to learn about and install the tool."
#else
     #"${DIR}/android-logview.sh"
#fi


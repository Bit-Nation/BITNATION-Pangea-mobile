#!/usr/bin/env bash

# https://github.com/tstack/lnav/blob/master/src/help.txt
# Requires lnav to be installed. 
# Requires 'npm run android' to run first.

# If running from vs code, you may have to enable page up and page down
# in your keybinds settings for a better experience 
# https://github.com/Microsoft/vscode/issues/30930#issuecomment-316083328

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

APP_PID=$(node $DIR/android/get-pid.js)
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
echo ""
echo -e "${CYAN}Launching lnav with logs filtered on app pid:$YELLOW $APP_PID"
sleep .5

LNAVLOG=$DIR/../data/logs/lnav.log
if [ -e $LNAVLOG ]; then
    rm $LNAVLOG
fi

lnav -d $LNAVLOG -nq -c ":load-session" \
     -c ":reset-session" \
     -c ":save-session" \
     "${DIR}/../data/logs/pangea-android-logcat.log"

lnav -d $LNAVLOG -c ":load-session" \
     -c ":filter-in (\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}.\\d{3}) (\\s?${APP_PID}) " \
     "${DIR}/../data/logs/pangea-android-logcat.log"


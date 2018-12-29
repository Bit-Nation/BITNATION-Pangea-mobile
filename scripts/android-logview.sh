# https://github.com/tstack/lnav/blob/master/src/help.txt
# Requires lnav to be installed. 
# Requires 'npm run android' to run first.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

APP_PID=$(node $DIR/android/get-pid.js)
echo "Launching lnav with logs filtered on app pid: $APP_PID"
lnav -c ":load-session" \
     -c ":reset-session" \
     -c ":filter-in (?<timestamp>\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}.\\d{3}) (\\s?${APP_PID}) .*" \
     -c ":save-session" \
     "${DIR}/../data/logs/pangea-android-logcat.log"


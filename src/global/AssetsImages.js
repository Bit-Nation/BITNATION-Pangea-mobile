const logo = require('../assets/images/logo.png');
const background = require('../assets/images/background.jpg');

const dashboardTabIcon = require('../assets/images/dashboardTabIcon.png');
const chatTabIcon = require('../assets/images/chatTabIcon.png');
const nationsTabIcon = require('../assets/images/nationsTabIcon.png');
const walletTabIcon = require('../assets/images/walletTabIcon.png');
const profileTabIcon = require('../assets/images/profileTabIcon.png');

const holonsPlaceholder = require('../assets/images/holonsPlaceholder.png');
const achievementsPlaceholder = require('../assets/images/achievementsPlaceholder.png');
const mapPlaceholder = require('../assets/images/mapPlaceholder.png');
const demoPlaceholder = require('../assets/images/demoImage.png');

const chatActionIcon = require('../assets/images/chatIcon.png');
const mapActionIcon = require('../assets/images/mapIcon.png');
const joinActionIcon = require('../assets/images/joinIcon.png');
const leaveActionIcon = require('../assets/images/leaveIcon.png');

const Images = {
  logo,
  background,
  TabIcons: {
    dashboard: dashboardTabIcon,
    chat: chatTabIcon,
    nations: nationsTabIcon,
    wallet: walletTabIcon,
    profile: profileTabIcon,
  },
  Placeholder: {
    holons: holonsPlaceholder,
    achievements: achievementsPlaceholder,
    map: mapPlaceholder,
    demo: demoPlaceholder,
  },
  Actions: {
    chat: chatActionIcon,
    map: mapActionIcon,
    join: joinActionIcon,
    leave: leaveActionIcon,
  }
};

export default Images;

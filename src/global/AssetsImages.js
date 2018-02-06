const logo = require('../assets/images/logo.png');

const background = require('../assets/images/background-gray.jpg');
const rightArrow = require('../assets/images/right_arrow.png');
const ethereumLogo = require('../assets/images/ethereum_logo.png');
const demo = require('../assets/images/demoImage.png');
const eth = require('../assets/images/ethereum_logo.png');
const qrColor = require('../assets/images/QR_icon.png');
const bitLogo = require('../assets/images/bitnation_logo.png');
const bitLogoBig = require('../assets/images/bitnation_logo_big.png');

// Photos and Graphics for Introduction Screens
const build = require('../assets/images/Chrysler_Building.png');
const monroe = require('../assets/images/monroe.png');
const fern = require('../assets/images/fern.png');
const moon = require('../assets/images/moon.png');

const privateKeyDemo = require('../assets/images/privateKeyDemo.png');

// Main Navigation Icons
const dashboardTabIcon = require('../assets/images/dashboardTabIcon.png');
const chatTabIcon = require('../assets/images/chatTabIcon.png');
const nationsTabIcon = require('../assets/images/nationsTabIcon.png');
const walletTabIcon = require('../assets/images/walletTabIcon.png');
const profileTabIcon = require('../assets/images/profileTabIcon.png');
const QR = require('../assets/images/QR.png');

// DEMO placeholders
const holonsPlaceholder = require('../assets/images/holonsPlaceholder.png');
const achievementsPlaceholder = require('../assets/images/achievementsPlaceholder.png');
const mapPlaceholder = require('../assets/images/mapPlaceholder.png');
const demoPlaceholder = require('../assets/images/demoImage.png');
const avatarPlaceholder = require('../assets/images/avatarPlaceholder.png');

// Tool Bar Icons
const chatActionIcon = require('../assets/images/toolbarIconChatTool.png');
const mapActionIcon = require('../assets/images/toolbarIconMapTool.png');
const joinActionIcon = require('../assets/images/toolbarIconJoin.png');
const leaveActionIcon = require('../assets/images/toolbarIconLeave.png');

const Images = {
  logo,
  background,
  rightArrow,
  ethereumLogo,
  demo,
  eth,
  qrColor,
  bitLogo,
  build,
  monroe,
  fern,
  moon,
  bitLogoBig,
  QR,
  privateKeyDemo,
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
    avatar: avatarPlaceholder,
  },
  Actions: {
    chat: chatActionIcon,
    map: mapActionIcon,
    join: joinActionIcon,
    leave: leaveActionIcon,
  },
};

export default Images;

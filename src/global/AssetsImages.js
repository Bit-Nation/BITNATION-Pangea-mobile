const background = require('../assets/images/background.jpg');
const rightArrow = require('../assets/images/right_arrow.png');
const ethereumLogo = require('../assets/images/ethereum_logo.png');
const patLogo = require('../assets/images/pat_logo.png');
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
const dashboardTabIcon = require('../assets/images/tabIconDashboard.png');
const chatTabIcon = require('../assets/images/tabIconChat.png');
const nationsTabIcon = require('../assets/images/tabIconNations.png');
const walletTabIcon = require('../assets/images/tabIconWallet.png');
const profileTabIcon = require('../assets/images/tabIconProfile.png');
const QR = require('../assets/images/QR.png');

// DEMO placeholders
const demoPlaceholder = require('../assets/images/demoImage.png');
const avatarPlaceholder = require('../assets/images/avatarPlaceholder.png');

// Tool Bar Icons
const chatActionIcon = require('../assets/images/toolbarIconChat.png');
const mapActionIcon = require('../assets/images/toolbarIconMap.png');
const joinActionIcon = require('../assets/images/toolbarIconJoin.png');
const leaveActionIcon = require('../assets/images/toolbarIconLeave.png');

// Nations Create Tool Bar Icons
const resetActionIcon = require('../assets/images/toolbarIconReset.png');
const saveActionIcon = require('../assets/images/toolbarIconSave.png');
const deleteActionIcon = require('../assets/images/toolbarIconDelete.png');
const submitActionIcon = require('../assets/images/toolbarIconSubmit.png');
const userCitizenIcon = require('../assets/images/avatarCitizen.png');

const disclosureRowIcon = require('../assets/images/disclosure.png');

// Chat Nations UI
const signalIcon0 = require('../assets/images/signal_icon_0.png');
const signalIcon1 = require('../assets/images/signal_icon_1.png');
const signalIcon2 = require('../assets/images/signal_icon_2.png');
const signalIcon3 = require('../assets/images/signal_icon_3.png');
const signalIcon4 = require('../assets/images/signal_icon_4.png');
const signalIcon5 = require('../assets/images/signal_icon_5.png');
const botIconLucy = require('../assets/images/icon_chatbot.png');

const Images = {
  background,
  rightArrow,
  ethereumLogo,
  patLogo,
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
  userCitizenIcon,
  disclosureRowIcon,
  TabIcons: {
    dashboard: dashboardTabIcon,
    chat: chatTabIcon,
    nations: nationsTabIcon,
    wallet: walletTabIcon,
    profile: profileTabIcon,
  },
  Placeholder: {
    demo: demoPlaceholder,
    avatar: avatarPlaceholder,
  },
  Actions: {
    chat: chatActionIcon,
    map: mapActionIcon,
    join: joinActionIcon,
    leave: leaveActionIcon,

    reset: resetActionIcon,
    save: saveActionIcon,
    delete: deleteActionIcon,
    submit: submitActionIcon,
  },
  ChatUI: {
    signal0: signalIcon0,
    signal1: signalIcon1,
    signal2: signalIcon2,
    signal3: signalIcon3,
    signal4: signalIcon4,
    signal5: signalIcon5,
    botIcon: botIconLucy,
  },
};

export default Images;

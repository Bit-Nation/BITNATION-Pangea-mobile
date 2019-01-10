const background = require('../assets/images/background.png');
const ethereumLogo = require('../assets/images/ethereumLogo.png');
const xpatLogo = require('../assets/images/xpatLogo.png');
const bitLogo = require('../assets/images/bitnationLogo.png');
const bitLogoBig = require('../assets/images/bitnationLogoBig.png');

// Photos and Graphics for Introduction Screens
const build = require('../assets/images/Chrysler_Building.png');
const monroe = require('../assets/images/monroe.png');
const fern = require('../assets/images/fern.png');
const moon = require('../assets/images/moon.png');
const avatarIcon = require('../assets/images/avatarIcon.png');
const privateKeyDemo = require('../assets/images/privateKeyDemo.png');

// Main Navigation Icons
const dashboardTabIcon = require('../assets/images/tabIconDashboard.png');
const flag = require('../assets/images/flag-big.png');
const townhall = require('../assets/images/city-hallbig.png');
const globe = require('../assets/images/globe-big.png');
const walletTabIcon = require('../assets/images/tabIconWallet.png');

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
const moreMenuIcon = require('../assets/images/moreIcon.png');
const closeIcon = require('../assets/images/closeIcon.png');

// Chat Nations UI
const signalIcon0 = require('../assets/images/signal_icon_0.png');
const signalIcon1 = require('../assets/images/signal_icon_1.png');
const signalIcon2 = require('../assets/images/signal_icon_2.png');
const signalIcon3 = require('../assets/images/signal_icon_3.png');
const signalIcon4 = require('../assets/images/signal_icon_4.png');
const signalIcon5 = require('../assets/images/signal_icon_5.png');
const botIconLucy = require('../assets/images/icon_chatbot.png');

const chatNewMessageIcon = require('../assets/images/chat_indicator.png');
const groupChatIcon = require('../assets/images/groupChatIcon.png');
const menuIcon = require('../assets/images/menu.png');

const sendChatActiveIcon = require('../assets/images/sendChatActive.png');
const sendChatInActiveIcon = require('../assets/images/sendChatInActive.png');
const actionChatIcon = require('../assets/images/actionChat.png');
const lucyIcon = require('../assets/images/lucyIcon.png');
const searchIcon = require('../assets/images/iconSearch.png');

const Images = {
  background,
  ethereumLogo,
  xpatLogo,
  bitLogo,
  build,
  monroe,
  fern,
  moon,
  avatarIcon,
  bitLogoBig,
  privateKeyDemo,
  userCitizenIcon,
  disclosureRowIcon,
  moreMenuIcon,
  closeIcon,
  menuIcon,
  lucyIcon,
  searchIcon,
  TabIcons: {
    dashboard: dashboardTabIcon,
    chat: townhall,
    nations: flag,
    wallet: walletTabIcon,
    services: globe,
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
    newMsgIcon: chatNewMessageIcon,
    groupChatIcon,
    sendChatActiveIcon,
    sendChatInActiveIcon,
    actionChatIcon,
  },
};

export default Images;

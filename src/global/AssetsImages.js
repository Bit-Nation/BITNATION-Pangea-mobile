const logo = require('../assets/images/SplashImage.jpg');
const background = require('../assets/images/background.jpg');

const dashboardTabIcon = require('../assets/images/dashboardTabIcon.png');
const chatTabIcon = require('../assets/images/chatTabIcon.png');
const nationsTabIcon = require('../assets/images/nationsTabIcon.png');
const walletTabIcon = require('../assets/images/walletTabIcon.png');
const profileTabIcon = require('../assets/images/profileTabIcon.png');

// const holonsPlaceholder = require('../assets/images/holonsPlaceholder.png');
// const achievementsPlaceholder = require('../assets/images/achievementsPlaceholder.png');

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
//  Placeholder: {
//    holons: holonsPlaceholder,
//    achievements: achievementsPlaceholder,
//  }
};

export default Images;

import { Platform } from "react-native";
import {
  compose,
  nest,
  withHandlers,
  lifecycle,
  withState,
  withProps
} from "recompose";
import ServiceScreen from "./view";
import Colors from "pangea-common-reactnative/styles/colors";
import AssetsImages from "pangea-common-reactnative/assets/AssetsImages";
import { screen } from "pangea-common-reactnative/Screens";
import webView from "./components/WebViewModal/view";

const MENU_BUTTON = "MENU_BUTTON";

export default compose(
  withProps(() => ({
    selectedItem: {
      uri: "https://github.com/Bit-Nation/GOVMARKET/blob/master/README.md"
    }
  })),
  withState("showModal", "setShowModal", ""),
  withState("isAppear", "setIsAppear", false),
  withState("isShowWebViewModal", "setIsShowWebViewModal", false),
  withHandlers({
    onPressHelp: ({ setShowModal, navigator }) => () => {
      setShowModal("");
      if (Platform.OS === "android") {
        navigator.showModal({
          ...screen("CHAT_SCREEN"),
          passProps: {
            isBot: true
          }
        });
      } else {
        navigator.push({
          ...screen("CHAT_SCREEN"),
          passProps: {
            isBot: true
          }
        });
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.navigator.setButtons({
        leftButtons: [
          {
            id: MENU_BUTTON,
            icon: AssetsImages.menuIcon,
            buttonColor: Colors.navigationButtonColor
          }
        ],
        rightButtons: []
      });
      this.props.navigator.setOnNavigatorEvent(event => {
        switch (event.id) {
          case "willAppear":
            this.props.setIsAppear(true);
            break;
          case "willDisappear":
            this.props.setIsAppear(false);
            break;
          default:
            break;
        }
        if (event.type === "NavBarButtonPress") {
          if (event.id === MENU_BUTTON) {
            this.props.navigator.toggleDrawer({
              side: "left",
              animated: true
            });
          }
        }
        if (event.type === "DeepLink") {
          if (this.props.isAppear) {
            const parts = event.link.split("/");
            if (parts[0] === "push") {
              this.props.navigator.push(screen(parts[1]));
            }
          }
        }
      });
    }
  })
)(nest(ServiceScreen, webView));

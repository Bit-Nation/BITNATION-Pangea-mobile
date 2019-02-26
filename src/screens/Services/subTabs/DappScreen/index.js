import { Platform } from "react-native";
import { compose, withHandlers, nest, withState } from "recompose";
import SubTabComponent from "../../components/SubTabComponent/view";
import withSubTabHOC from "../../components/SubTabComponent/index";
import { screen } from "../../../../global/Screens";
import webView from "../../components/WebViewModal/view";

export default compose(
  withSubTabHOC,
  withState("isShowWebViewModal", "setIsShowWebViewModal", false),
  withHandlers({
    onPressMainButton: ({ setIsShowWebViewModal, navigator }) => ({ uri }) => {
      if (
        uri === "https://refugees.bitnation.co/blockchain-emergency-id-be-id/"
      ) {
        setIsShowWebViewModal(true);
      } else {
        if (Platform.OS === "android") {
          navigator.showModal(screen("DOCUMENTS_LIST_SCREEN"));
        } else {
          navigator.push(screen("DOCUMENTS_LIST_SCREEN"));
        }
      }
    }
  })
)(nest(SubTabComponent, webView));

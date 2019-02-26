import { compose, withHandlers, nest, withState } from 'recompose';
import SubTabComponent from '../../components/SubTabComponent/view';
import withSubTabHOC from '../../components/SubTabComponent/index';
import { screen } from 'pangea-common-reactnative/Screens';
import webView from '../../components/WebViewModal/view';

export default compose(
  withSubTabHOC,
  withState('isShowWebViewModal', 'setIsShowWebViewModal', false),
  withHandlers({
    onPressMainButton: ({ setIsShowWebViewModal, navigator }) => ({ uri }) => {
      if (uri === 'https://refugees.bitnation.co/blockchain-emergency-id-be-id/') {
        setIsShowWebViewModal(true);
      } else {
        navigator.showModal(screen('DOCUMENTS_LIST_SCREEN'));
      }
    },
  }),
)(nest(SubTabComponent, webView));

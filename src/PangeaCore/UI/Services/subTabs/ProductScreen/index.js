
import { compose, withHandlers, nest, withState } from 'recompose';
import SubTabComponent from '../../components/SubTabComponent/view';
import withSubTabHOC from '../../components/SubTabComponent/index';
import webView from '../../components/WebViewModal/view';

export default compose(
  withSubTabHOC,
  withState('isShowWebViewModal', 'setIsShowWebViewModal', false),
  withHandlers({
    onPressMainButton: ({ setIsShowWebViewModal }) => () => {
      setIsShowWebViewModal(true);
    },
  }),
)(nest(SubTabComponent, webView));

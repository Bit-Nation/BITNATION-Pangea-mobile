import { WebView } from 'react-native';
import { compose, withHandlers } from 'recompose';
import SubTabComponent from '../../components/SubTabComponent/view';
import withSubTabHOC from '../../components/SubTabComponent/index';

export default compose(
  withSubTabHOC,
  withHandlers({
    onPressMainButton: () => async ({ uri }) => {
      <WebView
        source={{ uri }}
        style={{ marginTop: 20 }}
      />;
    },
  }),
)(SubTabComponent);

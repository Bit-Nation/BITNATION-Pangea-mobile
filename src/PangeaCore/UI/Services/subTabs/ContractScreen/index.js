import { Share } from 'react-native';
import { compose, withHandlers } from 'recompose';
import SubTabComponent from '../../components/SubTabComponent/view';
import withSubTabHOC from '../../components/SubTabComponent/index';
import { errorAlert } from '../../../../global/alerts';

export default compose(
  withSubTabHOC,
  withHandlers({
    onPressMainButton: () => async ({ uri }) => {
      try {
        const response = await fetch(uri);
        const text = await response.text();
        Share.share({
          message: text || '',
        });
      } catch (error) {
        errorAlert(error);
      }
    },
  }),
)(SubTabComponent);

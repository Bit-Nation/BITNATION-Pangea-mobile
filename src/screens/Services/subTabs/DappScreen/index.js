import { Clipboard, Alert } from 'react-native';
import { compose, withHandlers } from 'recompose';
import SubTabComponent from '../../components/SubTabComponent/view';
import withSubTabHOC from '../../components/SubTabComponent/index';
import { errorAlert } from '../../../../global/alerts';
import i18n from '../../../../global/i18n';

export default compose(
  withSubTabHOC,
  withHandlers({
    // onPressMainButton: () => async ({ uri }) => {
    //   try {
    //     const response = await fetch(uri);
    //     const text = await response.text();

    //     Alert.alert(i18n.t('screens.govMarket.clipboardAlert'));
    //     Clipboard.setString(text);
    //   } catch (error) {
    //     errorAlert(error);
    //   }
    // },
  }),
)(SubTabComponent);

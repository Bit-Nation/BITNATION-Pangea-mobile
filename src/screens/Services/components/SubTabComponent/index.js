import { Clipboard, Alert } from 'react-native';
import { compose, withState, withHandlers } from 'recompose';
import { first } from 'lodash';
import SubTabComponent from './view';
import { errorAlert } from '../../../../global/alerts';
import i18n from '../../../../global/i18n';

export default compose(
  withState('selectedItem', 'setSelectedItem', ({ list }) => first(list) || {}),

  withHandlers(() => {
    let myFlatlist = null;
    return {
      onRef: () => ref => (myFlatlist = ref),
      onPressItem: ({ setSelectedItem }) => (item) => {
        setSelectedItem(item);
        myFlatlist.scrollTo({ y: 0 });
      },
    };
  }),
  withHandlers({
    onPressMainButton: () => async ({ uri }) => {
      try {
        const response = await fetch(uri);
        const text = await response.text();

        Alert.alert(i18n.t('screens.govMarket.clipboardAlert'));
        Clipboard.setString(text);
      } catch (error) {
        errorAlert(error);
      }
    },
  }),
)(SubTabComponent);

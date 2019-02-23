import { compose, withState, withHandlers } from 'recompose';
import { first } from 'lodash';


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

);

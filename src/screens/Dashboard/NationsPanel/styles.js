// @flow

import GlobalStyles from '../../../global/Styles';
import Colors from '../../../global/colors';

const styles = {
  ...GlobalStyles,
  panelViewTitle: {
    ...GlobalStyles.panelViewTitle,
    color: Colors.BitnationHighlightColor,
  },
  // View: The panel holding the nations info.
  // Make the contents align to top.
  nationsGridPanel: {
    ...GlobalStyles.gridPanelView,
    justifyContent: 'flex-start',
  },
  // View: Shows "XXX in Pangea"
  nationsCountContainer: {
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  // Text: Number of nations, shown in the text above the list.
  nationsCountString: {
    ...GlobalStyles.bodyBlack,
    color: 'white', // Colors.BitnationHighlightColor,
  },
  // LIST OF NATIONS
  // use the listContainer, but bring edge to edge of the containing View.
  listContainer: {
    ...GlobalStyles.listContainer,
    ...GlobalStyles.removeGridPanelMarginsLR,
  },
  // Text: Header bar across the top of the list of nations in the panel
  nationsListHeaderText: {
    ...GlobalStyles.body,
    // color: Colors.BitnationHighlightColor,
  },
  // Text: Name of a nation in the list, e.g. "My Country"
  nationsListText: {
    ...GlobalStyles.listItemTextVeryBold,
  },
};

export default styles;

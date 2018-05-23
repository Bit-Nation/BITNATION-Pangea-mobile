// @flow

import Colors from '../../global/colors';
import GlobalStyles from '../../global/Styles';

const styles = {
  ...GlobalStyles,

  panelViewTitle: {
    ...GlobalStyles.panelViewTitle,
    color: Colors.BitnationHighlightColor,
  },
  activityPanelContainer: {
    flex: 1,
  },
  activityPanel: {
    flex: 1,
  },
  bottomContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  nationsPanel: {
    flex: 1,
    marginRight: 4,
  },
  rightContainer: {
    marginLeft: 4,
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  walletPanel: {
    // flex: 2,
  },
  // This is a panel, unlike the other styles above, which are views
  // which hold panelViews.
  warningPanel: {
    ...GlobalStyles.gridPanelView,
    flex: 1,
  },
  warningPanelBody: {
    ...GlobalStyles.body,
    fontWeight: '300',
  },
  //
  confirmKeyPanel: {
    ...GlobalStyles.gridPanelView,
    flex: 1,
  },
  confirmKeyBody: {
    ...GlobalStyles.body,
    fontWeight: '500',
  },
};
export default styles;

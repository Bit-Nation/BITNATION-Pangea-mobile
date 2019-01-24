import { compose, withHandlers } from 'recompose';
import SubTabComponent from '../../components/SubTabComponent/view';
import withSubTabHOC from '../../components/SubTabComponent/index';

export default compose(
  withSubTabHOC,
  withHandlers({

  }),
)(SubTabComponent);

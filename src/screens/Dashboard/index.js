import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Images from '../../global/AssetsImages';
import styles from './styles';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import PanelView from '../../components/common/PanelView';
import { prettyETHWalletBalance, roundEth } from '../../utils/formatters';
import Strings from '../../global/Strings';
import i18n from '../../global/i18n';

class Dashboard extends Component {

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <FakeNavigationBar navBarHidden/>
        <View style={styles.stackView}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={Images.bitLogoBig} resizeMode='contain'/>
          </View>
          <PanelView
            title={i18n.t('screens.dashboard.walletPanel.title')}
            body={
              _.isEmpty(this.props.wallets) ?
                i18n.t('screens.dashboard.walletPanel.empty')
                :
                prettyETHWalletBalance(this.props.wallets[0])
            }
          />

          <PanelView
            title={i18n.t('screens.dashboard.warningPanel.title')}
            body={i18n.t('screens.dashboard.warningPanel.body')}
          />
        </View>
      </View>
    );
  }

}

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
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
            title='Wallet'
            body={
              _.isEmpty(this.props.wallets) ?
                Strings.dashboard.walletEmptyState
                :
                prettyETHWalletBalance(this.props.wallets[0])
            }
          />

          <PanelView
            title={Strings.dashboard.warningTitle}
            body={Strings.dashboard.warningBody}
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
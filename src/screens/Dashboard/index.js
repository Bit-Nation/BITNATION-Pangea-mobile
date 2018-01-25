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
import MessageView from '../../components/common/MessageView';
import { prettyETHWalletBalance, roundEth } from '../../utils/formatters';

class Dashboard extends Component {

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage/>
        <View style={styles.stackView}>
          <MessageView
            title='Wallet'
            messageText={
              _.isEmpty(this.props.wallets) ?
                'Begin using Pangea by creating your wallet.'
                :
                prettyETHWalletBalance(this.props.wallets[0])
            }
          />

          <MessageView
            title='Warning'
            messageText='Use the Pangea app at your own risk.'
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
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletScreen extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <View>
        <Text>Wallet Screen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);

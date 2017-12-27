import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DashboardScreen extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <View>
        <Text>Dashboard Screen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

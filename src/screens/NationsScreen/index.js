import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NationsScreen extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <View>
        <Text>Nations Screen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NationsScreen);

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetRoute } from '../../actions/nav';

class MainScreen extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <View>
        <Text>Main Screen</Text>
      </View>
    );
  }
}

MainScreen.propTypes = {
  resetRoute: PropTypes.func,
};

MainScreen.defaultProps = {
  resetRoute: () => null,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  resetRoute: route => dispatch(resetRoute(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

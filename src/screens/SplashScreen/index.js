import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetRoute } from '../../actions/nav';
import Images from '../../global/AssetsImages';
import styles from './styles';

class SplashScreen extends Component {
  componentWillMount() {
    if (this.props.resetRoute) {
      setTimeout(() => {
        this.props.resetRoute({ routeName: 'MainScreen' });
      }, 3000);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={Images.logo} resizeMode="contain" />
        </View>
      </View>
    );
  }
}

SplashScreen.propTypes = {
  resetRoute: PropTypes.func,
};

SplashScreen.defaultProps = {
  resetRoute: () => null,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  resetRoute: route => dispatch(resetRoute(route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

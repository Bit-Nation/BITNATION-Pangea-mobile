import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Images from '../../global/AssetsImages';
import styles from './styles';

class SplashScreen extends Component {
  componentWillMount() {
      setTimeout(() => {
      // TODO: Replace navigation with redux actions
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'Pangea.Dashboard',
            // title: 'Dashboard',
             navigatorStyle
          },
        });
      }, 3000);
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
  navigator: PropTypes.object
};

navigatorStyle = {
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarBackgroundColor: '#0a0a0a',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

SplashScreen.defaultProps = {
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

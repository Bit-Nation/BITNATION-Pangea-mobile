
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, BackHandler } from 'react-native';
import { addNavigationHelpers, StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';

import SplashScreen from '../screens/SplashScreen';
import MainScreen from '../screens/MainScreen';

export const AppNavigator = StackNavigator({
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null,
      }
    },
    MainScreen: {
      screen: MainScreen,
      navigationOptions: {
        header: null,
      }
    },
  });

  
  class AppWithNavigationState extends Component {
    
      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
    
      onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
          return false;
        }
        dispatch(NavigationActions.back());
        return true;
      }
    
      render() {
        const { dispatch, nav } = this.props;
        return (
          <View style={{ flex: 1 }}>
            <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
          </View>
        );
      }
    }
    
    const mapStateToProps = state => ({
      nav: state.nav,
    });
    
    const mapDispatchToProps = dispatch => ({
      dispatch: (action) => dispatch(action),
    });
    
    export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
    
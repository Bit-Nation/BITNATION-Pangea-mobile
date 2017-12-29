import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    AppRegistry
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import App from './App';





const mapStateToProps = state => ({
                                  ...state,
                                  });

const mapDispatchToProps = dispatch => ({
});


class ChatScreen extends Component {
    componentWillMount() {
    }

    render() {
//        return (
//                <View style={{ flex: 1 }}>
//                <Text>Chat Screen</Text>

//                </View>
//                );
    }
}

AppRegistry.registerComponent('Pangea', () => App);


export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);

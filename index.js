
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

import './shim';
import { AppRegistry } from 'react-native';

import App from './App';


const mapStateToProps = state => ({
                                  ...state,
                                  });

const mapDispatchToProps = dispatch => ({
});

AppRegistry.registerComponent('Pangea', () => App);

export default connect(mapStateToProps, mapDispatchToProps);

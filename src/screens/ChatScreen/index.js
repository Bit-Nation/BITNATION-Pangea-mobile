import React, { Component } from 'react';

import {
  View,
  Image
} from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default class Chat extends Component {
  render() {
    return (

      <Image
      source={require("../../assets/images/staticChat.png")}
      resizeMode="contain"
      style={{flex:1, height: undefined, width: undefined}}
      />

    );
  }
}

//const styles = {flex:1, height: undefined, width: undefined};

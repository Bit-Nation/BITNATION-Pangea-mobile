import React, { Component } from 'react';

import {
  View,
  Image
} from 'react-native';


export default class Chat extends Component {
  render() {
    return (

      <Image
      source={require("./staticChat.png")}
      resizeMode="cover"
      style="{styles}"
      />

    );
  }
}

const styles = {};

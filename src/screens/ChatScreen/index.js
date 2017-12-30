import React, { Component } from 'react';

import {
  View,
  Image
} from 'react-native';


export default class Chat extends Component {
  render() {
    return (

      <Image
      source={require("./src/assets/images/staticChat.png")}
      resizeMode="contain"
      style="{styles}"
      />

    );
  }
}

const styles = {{flex:1, height: undefined, width: undefined}};

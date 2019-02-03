// @flow

import React, { Component } from 'react';
import { View, Linking, Image, Text, TouchableOpacity } from 'react-native';

import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import facebook from '../../assets/images/facebook.png';
import steemit from '../../assets/images/steemit.png';
import telegram from '../../assets/images/telegram.png';
import github from '../../assets/images/github.png';
import twitter from '../../assets/images/twitter.png';
import Card from '../../components/Card';
import styles from './styles';

class InfoScreen extends Component {
  openLink = (url) => {
    Linking.openURL(url);
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.mainContainer}>
          <Card style={styles.card}>
            <TouchableOpacity
              onPress={() => this.openLink('https://twitter.com/@MyBitnation')}
            >
              <Image
                source={twitter}
                style={{ height: 80, width: 80, marginRight: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openLink('https://github.com/Bit-Nation')}
            >
              <Image source={github} style={{ height: 80, width: 80 }} />
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <TouchableOpacity
              style={{ marginRight: 35 }}
              onPress={() => this.openLink('https://angel.co/bitnation')}
            >
              <Card.Square uri='https://cdn.iconscout.com/icon/free/png-256/angellist-3-599132.png' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openLink('https://t.me/PangeaBitnation')}
            >
              <Image source={telegram} style={{ height: 80, width: 80 }} />
            </TouchableOpacity>
          </Card>
          <Card style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                this.openLink('https://www.facebook.com/MyBitnation')
              }
            >
              <Image
                source={facebook}
                style={{ height: 80, width: 80, marginRight: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openLink('https://steemit.com/@bitnation')}
            >
              <Image source={steemit} style={{ height: 80, width: 80 }} />
            </TouchableOpacity>
          </Card>
          <Text style={styles.email}>info@bitnation.co</Text>
        </View>
      </View>
    );
  }
}

export default InfoScreen;

import React, { Component } from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import AssetsImage from '../../../global/AssetsImages';

class ProfileScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <View style={styles.fakeNavigationBar}/>
        {this._buildHeader()}
        <ScrollView>
          {this._buildHolonsView()}
          {this._buildAchievemntsView()}
        </ScrollView>
      </View>
    );
  }

  _buildHeader() {
    const { user } = this.props;

    const avatarSource = user.avatar ?
      { uri: `data:image/gif;base64,${user.avatar}` } :
      AssetsImage.logo;

    return (
      <View style={styles.header}>
        <Image source={avatarSource} style={styles.avatar}/>
        <Text style={styles.nameText}>{user.name}</Text>
        <Text style={styles.infoText}>{user.location}</Text>
        <Text style={styles.infoText}>{user.latitude + ', ' + user.longitude}</Text>
        <Text style={styles.ethAddress}>{user.ethAddress}</Text>
      </View>
    );
  }

  _buildHolonsView() {
    return (
      <View style={styles.infoContainer}>
        <Image style={styles.placeholder} source={AssetsImage.Placeholder.holons}/>
      </View>
    );
  }

  _buildAchievemntsView() {
    return (
      <View style={[styles.infoContainer, styles.achievementsContainer]}>
        <Image style={styles.placeholder} source={AssetsImage.Placeholder.achievements}/>
      </View>
    );
  }

}

ProfileScreen.propTypes = {
  user: PropTypes.object.isRequired
};


export default ProfileScreen;

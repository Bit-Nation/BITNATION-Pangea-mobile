import React, { Component } from 'react';
import {
  Image,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import Text from '../../../components/common/Text';
import Button from '../../../components/common/Button';
import AssetsImage from '../../../global/AssetsImages';

class ProfileScreen extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <BackgroundImage/>
        {this._buildHeader()}
        {this._buildHolonsView()}
        {this._buildAchievemntsView()}
      </ScrollView>
    );
  }

  _buildHeader() {
    return (
      <View>

      </View>
    );
  }

  _buildHolonsView() {
    return (
      <View style={[styles.infoContainer, styles.holonsContainer]}>
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

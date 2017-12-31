import React, { Component } from 'react';
import {
  View,
  Text, SectionList,
} from 'react-native';
import PropTypes from 'prop-types';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';

class NationDetailsScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
      </View>
    );
  }

}

export default NationDetailsScreen;

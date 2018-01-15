import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import BackgroundImage from '../../../components/BackgroundImage';
import AssetsImage from '../../../global/AssetsImages';
import MessageView from '../../../components/MessageView';

class EmptyProfileScreen extends Component {

  componentWillMount() {
    this.props.navigator.setButtons({ leftButtons: [], rightButtons: [] });
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <View style={styles.topSpacer}/>

        <MessageView
          title="Become a world citizen."
          messageText="Bitnation is a decentralized, open-source movement, powered by the Bitcoin blockchain 2.0 technology, in an
            attempt to foster a peer-to-peer voluntary governance system, rather than the current ‘top-down’,
            ‘one-size-fits-all’ model, restrained by the current nation-state-engineered geographical apartheid, where
            your quality of life is defined by where you were arbitrarily born."
          buttonTitle="Create a User Profile"
          onButtonClick={this.props.onCreateUserProfile}
          style={styles.messageView}
        />

        <View style={styles.bottomSpacer}>
          <Image source={AssetsImage.logo} opacity={0.3}/>
        </View>
      </View>
    );
  }

}

EmptyProfileScreen.propTypes = {
  onCreateUserProfile: PropTypes.func.isRequired
};


export default EmptyProfileScreen;

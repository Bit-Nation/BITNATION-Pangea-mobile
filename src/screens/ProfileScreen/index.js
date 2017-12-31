import React, { Component } from 'react';
import {
<<<<<<< HEAD
  Image,
  View,
=======
  View,
  Text,
>>>>>>> develop
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

<<<<<<< HEAD
import styles from './styles';
import BackgroundImage from '../../components/common/BackgroundImage';
import Text from '../../components/common/Text';
import Button from '../../components/common/Button';
import AssetsImage from '../../global/AssetsImages';

class ProfileScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <View style={styles.topSpacer}/>

        {this.buildMessageView()}

        <View style={styles.bottomSpacer}>
          <Image source={AssetsImage.logo} opacity={0.3}/>
        </View>
      </View>
    );
  }

  buildMessageView() {
    return (
      <View style={styles.messageView}>
        <View style={styles.messageContainer}>
          <Text messageTitle>
            Become a world citizen.
          </Text>
          <Text messageText style={styles.messageText}>
            Bitnation is a decentralized, open-source movement, powered by the Bitcoin blockchain 2.0 technology, in an
            attempt to foster a peer-to-peer voluntary governance system, rather than the current ‘top-down’,
            ‘one-size-fits-all’ model, restrained by the current nation-state-engineered geographical apartheid, where
            your quality of life is defined by where you were arbitrarily born.
          </Text>
          <Button style={styles.button} title="Create a User Profile" onPress={this._onCreateUserProfile}/>
        </View>
      </View>
    );
  }

  _onCreateUserProfile = () => {
  };

=======
class ProfileScreen extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <View>
        <Text>Profile Screen</Text>
      </View>
    );
  }
>>>>>>> develop
}

const mapStateToProps = state => ({
  ...state,
});

<<<<<<< HEAD
const mapDispatchToProps = dispatch => ({});
=======
const mapDispatchToProps = dispatch => ({
});
>>>>>>> develop

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

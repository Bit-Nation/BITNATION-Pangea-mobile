// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Input, Label, Button, Text, Item } from 'native-base';

import NavigatorComponent from '../../components/common/NavigatorComponent';
import i18n from '../../global/i18n';
import { findUserByPublicKey } from '../../actions/chat';
import type { Navigator } from '../../types/ReactNativeNavigation';

import styles from './styles';
import BackgroundImage from '../../components/common/BackgroundImage';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import ScreenTitle from '../../components/common/ScreenTitle';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc Function to find a user
   * @param publicKey Public Key of the user
   */
  findUserByPublicKey: (publicKey: string) => void,
}

type Actions = {

}

class NewChatScreen extends NavigatorComponent<Props & Actions> {
  constructor(props: Props) {
    super(props);
    this.state = {
      key: '',
    };
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.chat.newConversation')} />
        <View style={styles.bodyContainer}>
          <Item inlineLabel>
            <Label style={styles.textInput}>To: </Label>
            <Input
              onChangeText={value => this.setState({ key: value })}
              value={this.state.key}
              style={styles.textInput}
              placeholder={i18n.t('screens.chat.pubKeyPlaceholder')}
            />
          </Item>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {}}
              style={styles.chatActionButton}
            >
              <Text>{i18n.t('screens.chat.scanQrCode')}</Text>
            </Button>
            <Button
              onPress={() => {}}
              style={styles.chatActionButton}
            >
              <Text>{i18n.t('screens.chat.pasteClipboard')}</Text>
            </Button>
            <Button
              onPress={() => {}}
              style={styles.chatActionButton}
            >
              <Text>{i18n.t('screens.chat.qrCodeLibrary')}</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  findUserByPublicKey(publicKey) {
    dispatch(findUserByPublicKey(publicKey));
  },
});

export default connect(null, mapDispatchToProps)(NewChatScreen);

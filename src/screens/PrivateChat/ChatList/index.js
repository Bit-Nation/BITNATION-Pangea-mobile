// TODO add FLOW

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  SectionList,
  Clipboard,
} from 'react-native';
import _ from 'lodash';
import { Fab, Text } from 'native-base';
import ActionSheet from 'react-native-actionsheet';

import { saveProfile, newChatSession, openChat } from '../../../actions/chat';
import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import { screen } from '../../../global/Screens';
import ChatListItem from '../../../components/common/ChatListItem';
import NationListHeader from '../../../components/common/NationListHeader';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';
import type { ChatSessionType } from '../../../types/Chat';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import ScreenTitle from '../../../components/common/ScreenTitle';
import ChatService from '../../../services/chat';
import NewChatModal from './NewChatModal';
import InvalidKeyModal from './InvalidKeyModal';
import InviteSentModal from './InviteSentModal';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc List of all chat sessions
   */
  chatSessions: Array<ChatSessionType>,
  /**
   * @desc Function to save a user profile
   * @param {Object} profile User profile
   */
  saveProfile: (profile: Object) => void,
  /**
   * @desc Function to be called when an item is selected from the list
   * @param {string} key Public key of the chat session
   * @param {func} callback
   */
  onItemSelect: (key: string, callback: (success: boolean) => void) => void,
  /**
   * @desc Function to initialize a new chat
   * @param {string} key public key of the user
   * @param {Object} initMessage response from the panthalassa library method
   * @param {func} callback
   */
  createNewSession: (key: string, initMessage: Object, callback: (success: boolean) => void) => void,
};

type State = {
  /**
   * @desc User public key
   */
  publicKey: string,
  /**
   * @desc User profile object
   */
  profile: any,
  /**
   * @desc Name of the modal to be shown
   */
  showModal: string
};

class ChatListScreen extends NavigatorComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      publicKey: '',
      profile: null,
      showModal: '',
    };
  }

  onChatAction = (index) => {
    switch (index) {
      case 0:
        this.getPublicKeyFromClipboard();
        break;
      default:
        break;
    }
  }

  getPublicKeyFromClipboard = async () => {
    const pubKey = await Clipboard.getString();
    console.log('pub key: ', pubKey);
    await this.getUserProfile(pubKey);
  }

  getUserProfile = async (publicKey) => {
    try {
      const response = await ChatService.getProfile(publicKey);
      const profile = JSON.parse(response.profile);
      console.log('fetch profile: ', profile);
      this.setState({
        publicKey,
        profile,
        showModal: 'new_chat',
      });
      this.props.saveProfile(profile);
    } catch (e) {
      console.log('fetch error: ', e);
      this.setState({
        publicKey: '',
        profile: null,
        showModal: 'invalid_key',
      });
    }
  }

  startChat = async () => {
    try {
      const response = await ChatService.getPreKeyBundle(this.state.publicKey);
      // console.log('fetch bundle: ', response);
      const initMessage = await ChatService.startChat(this.state.publicKey, JSON.stringify(response.bundle));
      this.props.createNewSession(this.state.profile, initMessage, (success) => {
        if (success) {
          this.props.navigator.push({
            ...screen('PRIVATE_CHAT_SCREEN'),
          });
        }
      });
      this.setState({
        showModal: '',
      });
    } catch (e) {
      console.log('fetch error: ', e);
      this.setState({
        showModal: 'invalid_key',
      });
    }
  }

  onChatSelect = (id) => {
    this.props.onItemSelect(id, (success) => {
      if (success) {
        this.props.navigator.push({
          ...screen('PRIVATE_CHAT_SCREEN'),
        });
      }
    });
  }

  dismissModal = () => {
    this.setState({
      publicKey: '',
      profile: null,
      showModal: '',
    });
  }

  showActionSheet = () => {
    this.actionSheet.show();
  }

  render() {
    const sortedSessions = _.sortBy(this.props.chatSessions, session => session.username);
    const groups = _.groupBy(sortedSessions, session => session.username.charAt(0));
    const sections = _.map(groups, (group, key) => ({
      title: key,
      data: group,
    }));

    const newChatOptions = [
      i18n.t('screens.chat.keyFromClipboard'),
      i18n.t('screens.chat.keyFromLibrary'),
      i18n.t('screens.chat.keyFromCamera'),
      i18n.t('screens.chat.dappChat'),
      i18n.t('screens.chat.cancel'),
    ];

    return (
      <View style={styles.nationsScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.chat.title')} />
        <SectionList
          renderItem={(item) => {
            const session = item.item;
            return (<ChatListItem
              text={session.username}
              participants=''
              itemIcon={0}
              onPress={this.onChatSelect}
              id={session.publicKey}
            />);
          }}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section }) => <NationListHeader title={section.title} />}
          sections={sections}
          style={styles.sectionList}
        />
        <Fab
          style={styles.fabStyle}
          position='bottomRight'
          onPress={this.showActionSheet}
        >
          <Text>+</Text>
        </Fab>
        <ActionSheet
          ref={(o) => { this.actionSheet = o; }}
          options={newChatOptions}
          cancelButtonIndex={newChatOptions.length - 1}
          onPress={this.onChatAction}
        />
        <NewChatModal
          profile={this.state.profile}
          visible={this.state.showModal === 'new_chat'}
          onStartChat={this.startChat}
          onCancel={this.dismissModal}
        />
        <InvalidKeyModal
          done={this.dismissModal}
          visible={this.state.showModal === 'invalid_key'}
        />
        <InviteSentModal
          done={this.dismissModal}
          visible={this.state.showModal === 'invite'}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chatSessions: state.chat.chats,
});

const mapDispatchToProps = dispatch => ({
  saveProfile: profile => dispatch(saveProfile(profile)),
  createNewSession: (key, initMessage, callback) => dispatch(newChatSession(key, initMessage, callback)),
  onItemSelect: (key, callback) => dispatch(openChat(key, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);

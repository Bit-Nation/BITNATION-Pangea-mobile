// @flow

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
import Loading from '../../../components/common/Loading';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';
import Colors from '../../../global/colors';
import type { ChatSessionType } from '../../../types/Chat';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import ScreenTitle from '../../../components/common/ScreenTitle';
import ChatService from '../../../services/chat';
import NewChatModal from './NewChatModal';
import InvalidKeyModal from './InvalidKeyModal';
import InviteSentModal from './InviteSentModal';
import MoreMenuModal from './MoreMenuModal';

const MORE_BUTTON = 'MORE_BUTTON';
const MORE_MODAL_KEY = 'moreMenu';
const NEW_CHAT_MODAL_KEY = 'new_chat';
const INVITE_MODAL_KEY = 'invite';
const INVALID_MODAL_KEY = 'invalid_key';

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
  onItemSelect: (key: string, callback: (result: Object) => void) => void,
  /**
   * @desc Function to initialize a new chat
   * @param {Object} profile Profile of the user
   * @param {func} callback
   */
  createNewSession: (profile: Object, callback: (result: Object) => void) => void,
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
  showModal: string,
  /**
   * @desc Flag whether loading is in progress.
   */
  loading: boolean,
};

class ChatListScreen extends NavigatorComponent<Props, State> {
  static navigatorButtons = {
    leftButtons: [],
    rightButtons: [{
      title: 'More',
      id: MORE_BUTTON,
      buttonColor: Colors.navigationButtonColor,
    }],
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      publicKey: '',
      profile: null,
      showModal: '',
      loading: false,
    };
  }

  onNavBarButtonPress(id) {
    if (id === MORE_BUTTON) {
      this.setState({
        showModal: MORE_MODAL_KEY,
      });
    }
  }

  actionSheet: any;

  onChatAction = async (index) => {
    switch (index) {
      case 0:
        try {
          this.setState({ loading: true });
          await this.getPublicKeyFromClipboard();
        } finally {
          this.setState({ loading: false });
        }
        break;
      default:
        break;
    }
  };

  getPublicKeyFromClipboard = async () => {
    const pubKey = await Clipboard.getString();
    await this.getUserProfile(pubKey);
  };

  getUserProfile = async (publicKey) => {
    try {
      const profile = await ChatService.getProfile(publicKey);
      this.setState({
        publicKey,
        profile,
        showModal: NEW_CHAT_MODAL_KEY,
      });
      this.props.saveProfile(profile);
    } catch (e) {
      console.log(`[TEST] Profile fetch error: ${e.message}`);
      this.setState({
        publicKey: '',
        profile: null,
        showModal: INVALID_MODAL_KEY,
      });
    }
  };

  startChat = async () => {
    this.props.createNewSession(this.state.profile, (result) => {
      if (result.status === 'success') {
        this.props.navigator.push({
          ...screen('PRIVATE_CHAT_SCREEN'),
          passProps: {
            secret: result.secret,
            userPublicKey: result.userPublicKey,
          },
        });
      } else {
        console.log('create session error: ', result);
      }
      this.setState({
        showModal: '',
      });
    });
  };

  onChatSelect = (item) => {
    this.props.onItemSelect(item.publicKey, (result) => {
      if (result.status === 'success') {
        this.props.navigator.push({
          ...screen('PRIVATE_CHAT_SCREEN'),
          passProps: {
            secret: item.secret,
            userPublicKey: result.userPublicKey,
          },
        });
      }
    });
  };

  dismissModal = () => {
    this.setState({
      publicKey: '',
      profile: null,
      showModal: '',
    });
  };

  showActionSheet = () => {
    this.actionSheet.show();
  };

  render() {
    const sortedSessions = _.sortBy(this.props.chatSessions, session => session.username);
    const groups = _.groupBy(sortedSessions, session => session.username.charAt(0));
    const sections = _.map(groups, (group, key) => ({
      title: key,
      data: group,
    }));

    const newChatOptions = [
      i18n.t('screens.chat.keyFromClipboard'),
      // i18n.t('screens.chat.keyFromLibrary'),
      // i18n.t('screens.chat.keyFromCamera'),
      // i18n.t('screens.chat.dappChat'),
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
              id={session}
            />);
          }}
          keyExtractor={item => item.secret}
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
          ref={(o) => {
            this.actionSheet = o;
          }}
          options={newChatOptions}
          cancelButtonIndex={newChatOptions.length - 1}
          onPress={this.onChatAction}
        />
        <MoreMenuModal
          visible={this.state.showModal === MORE_MODAL_KEY}
          onCancel={this.dismissModal}
        />
        <NewChatModal
          profile={this.state.profile}
          visible={this.state.showModal === NEW_CHAT_MODAL_KEY}
          onStartChat={this.startChat}
          onCancel={this.dismissModal}
        />
        <InvalidKeyModal
          done={this.dismissModal}
          visible={this.state.showModal === INVALID_MODAL_KEY}
        />
        <InviteSentModal
          done={this.dismissModal}
          visible={this.state.showModal === INVITE_MODAL_KEY}
        />
        {this.state.loading === true && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chatSessions: state.chat.chats,
});

const mapDispatchToProps = dispatch => ({
  saveProfile: profile => dispatch(saveProfile(profile)),
  createNewSession: (profile, callback) => dispatch(newChatSession(profile, callback)),
  onItemSelect: (key, callback) => dispatch(openChat(key, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);

// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  SectionList,
  Clipboard,
  Share,
} from 'react-native';
import _ from 'lodash';
import { Fab, Text } from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import { getProfile, newChatSession, openChat } from '../../../actions/chat';
import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import { screen } from '../../../global/Screens';
import ChatListItem from '../../../components/common/ChatListItem';
import ChatListHeader from '../../../components/common/ItemsListHeader';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';
import Colors from '../../../global/colors';
import type { ProfileType, ChatSessionType, GiftedChatMessageType } from '../../../types/Chat';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import ScreenTitle from '../../../components/common/ScreenTitle';
import NewChatModal from './NewChatModal';
import InvalidKeyModal from './InvalidKeyModal';
import InviteSentModal from './InviteSentModal';
import { panthalassaIdentityPublicKey } from '../../../services/panthalassa';
import { imageSource } from '../../../utils/profile';
import AssetsImages from '../../../global/AssetsImages';
import MoreMenuModal from '../../../components/common/MoreMenuModal';

const MORE_BUTTON = 'MORE_BUTTON';
const MORE_MODAL_KEY = 'moreMenu';
const NEW_CHAT_MODAL_KEY = 'newChat';
const INVITE_MODAL_KEY = 'invite';
const INVALID_MODAL_KEY = 'invalidKey';

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
   * @desc Function to get user profile
   * @param {string} identityKey Identity key of user.
   * @param {function} callback Callback
   */
  getProfile: (identityKey: string, callback: (profile: (ProfileType | null), error: (Error | null)) => void) => void,
  /**
   * @desc Function to be called when an item is selected from the list
   * @param {string} key Public key of the chat session
   * @param {func} callback
   */
  onItemSelect: (key: string, callback: (result: Object) => void) => void,
  /**
   * @desc Function to initialize a new chat
   * @param {ProfileType} profile Profile of the user
   * @param {func} callback
   */
  createNewSession: (profile: ProfileType, callback: (result: Object) => void) => void,
};

type State = {
  /**
   * @desc User public key
   */
  publicKey: string,
  /**
   * @desc Profile of currently added user
   */
  profile: ProfileType | null,
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
      id: MORE_BUTTON,
      icon: AssetsImages.moreMenuIcon,
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
          const profile = await this.getPublicKeyFromClipboard();
          this.setState({
            publicKey: profile.identityKey,
            profile,
            showModal: NEW_CHAT_MODAL_KEY,
          });
        } catch (error) {
          this.setState({
            publicKey: '',
            profile: null,
            showModal: INVALID_MODAL_KEY,
          });
        } finally {
          this.setState({
            loading: false,
          });
        }
        break;
      default:
        break;
    }
  };

  getPublicKeyFromClipboard = async () => {
    const pubKey = await Clipboard.getString();
    return this.getUserProfile(pubKey);
  };

  getUserProfile = async publicKey => new Promise((res, rej) => {
    this.props.getProfile(publicKey, (profile, error) => {
      if (profile != null) {
        res(profile);
        return;
      }

      if (error != null) {
        console.log(`[TEST] Profile fetch error: ${error.message}`);
      }
      rej(error);
    });
  });

  startChat = async () => {
    const partnerProfile = this.state.profile;
    if (partnerProfile == null) {
      console.log('[TEST] No partner profile selected');
      return;
    }

    const chatSession = _.find(this.props.chatSessions, session => session.publicKey === partnerProfile.identityKey);

    if (chatSession != null) {
      this.onChatSelect(chatSession.publicKey);
      this.setState({
        showModal: '',
      });
      return;
    }

    this.props.createNewSession(partnerProfile, (result) => {
      if (result.status !== 'success') {
        console.log('[TEST] create session error: ', result);
        return;
      }

      this.setState({
        showModal: '',
      });

      this.props.navigator.push({
        ...screen('PRIVATE_CHAT_SCREEN'),
        passProps: {
          userPublicKey: result.userPublicKey,
          recipientPublicKey: partnerProfile.identityKey,
        },
      });
    });
  };

  onChatSelect = (publicKey: string) => {
    this.props.onItemSelect(publicKey, (result) => {
      if (result.status === 'success') {
        this.props.navigator.push({
          ...screen('PRIVATE_CHAT_SCREEN'),
          passProps: {
            userPublicKey: result.userPublicKey,
            recipientPublicKey: publicKey,
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

  sharePublicKey = async () => {
    const pubKey = await panthalassaIdentityPublicKey();
    Share.share({
      message: pubKey || '',
    }).then(() => {
      this.dismissModal();
    });
  };

  showActionSheet = () => {
    this.actionSheet.show();
  };

  render() {
    const sortedSessions = _.sortBy(this.props.chatSessions, session => session.profile.name);
    const groups = _.groupBy(sortedSessions, session => session.profile.name.charAt(0));
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
            const session: ChatSessionType = item.item;
            const iconSource = imageSource(session.profile.image) || AssetsImages.avatarIcon;
            const messagePreview = ((message: GiftedChatMessageType | null) => {
              if (message == null) return null;
              if (message.dAppMessage == null) return message.text;

              // @todo Add preview for DApp messages.
              return i18n.t('screens.chat.dAppMessagePreview');
            })(session.messages.length === 0 ? null : session.messages[session.messages.length - 1]);
            return (<ChatListItem
              name={session.profile.name}
              lastMessage={messagePreview}
              avatar={iconSource}
              onPress={this.onChatSelect}
              unreadMessages={session.unreadMessages}
              id={session.publicKey}
            />);
          }}
          keyExtractor={item => item.publicKey}
          renderSectionHeader={({ section }) => <ChatListHeader title={section.title} />}
          sections={sections}
          style={styles.sectionList}
          ItemSeparatorComponent={() => (<View style={styles.itemSeparator} />)}
        />
        <Fab
          style={styles.floatingButton}
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
          options={[{
            text: i18n.t('screens.chat.menu.shareIdentityKey'),
            onPress: this.sharePublicKey,
          }]}
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
  getProfile: (profile, callback) => dispatch(getProfile(profile, callback)),
  createNewSession: (profile, callback) => dispatch(newChatSession(profile, callback)),
  onItemSelect: (key, callback) => dispatch(openChat(key, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);

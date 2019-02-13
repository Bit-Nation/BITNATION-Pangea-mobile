// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, SectionList, Share, TextInput, Image } from 'react-native';
import _ from 'lodash';
import Dialog from 'react-native-dialog';

import { openChat, startNewChat, fetchAllChats } from '../../../actions/chat';
import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import { screen } from '../../../global/Screens';
import ChatListItem from '../../../components/common/ChatListItem';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import ScrollTabView, { DefaultTabBar } from '../../../components/ScrollTabView';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import LucyButton from '../../../components/common/LucyButton';
import i18n from '../../../global/i18n';
import Colors from '../../../global/colors';
import type {
  ProfileType,
  ChatType,
  GiftedChatMessageType,
} from '../../../types/Chat';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import InviteSentModal from './InviteSentModal';
import { panthalassaIdentityPublicKey } from '../../../services/panthalassa';
import { imageSource } from '../../../utils/profile';
import AssetsImages from '../../../global/AssetsImages';
import MoreMenuModal from '../../../components/common/MoreMenuModal';
import type { Contact } from '../../../types/Contacts';

import PopOverModal from '../../../components/PopOverModal';

const MENU_BUTTON = 'MENU_BUTTON';
const MORE_BUTTON = 'MORE_BUTTON';
const MORE_MODAL_KEY = 'moreMenu';
const INVITE_MODAL_KEY = 'invite';
const CHAT_NAME_MODAL = 'CHAT_NAME_MODAL';
const LUCY_MODAL_KEY = 'lucyModal';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc List of all chats.
   */
  chats: Array<ChatType>,
  /**
   * @desc Map of partner profiles. Key is an identity key, value is a profile.
   */
  profiles: { [string]: ProfileType },
  /**
   * @desc Function to open chat from the list of chats.
   * @param {number} chatId Id of chat to open.
   * @param {func} callback
   */
  openChat: (chatId: number) => void,
  /**
   * @desc Function to start new chat.
   * @param {string[]} members Array of identity keys of members.
   * @param {string|null} chatName Chat name for group chat or null for person chat.
   * @param {function} callback Callback that takes one boolean parameter that indicates if chat is successfully created.
   */
  startNewChat: (
    members: Array<string>,
    chatName: string | null,
    callback: (success: boolean) => void,
  ) => void,
  /**
   * @desc Function to fetch all chats
   */
  fetchAllChats: () => void,
};

type State = {
  /**
   * @desc Flag whether screen is in appear.
   */
  isAppear: boolean,
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
  /**
   * @desc Entered name of the creating chat.
   */
  chatName: string,
  /**
   * @desc List of contacts selected for creating chat.
   */
  contacts: Array<Contact>,
};

class ChatListScreen extends NavigatorComponent<Props, State> {
  static navigatorButtons = {
    leftButtons: [
      {
        id: MENU_BUTTON,
        icon: AssetsImages.menuIcon,
        buttonColor: Colors.navigationButtonColor,
      },
    ],
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isAppear: false,
      publicKey: '',
      profile: null,
      showModal: '',
      loading: false,
      contacts: [],
      chatName: '',
    };
  }

  onWillAppear() {
    this.setState({ isAppear: true });
  }

  onWillDisappear() {
    this.setState({ isAppear: false });
  }

  onHandleDeepLink(event) {
    if (this.state.isAppear) {
      const parts = event.link.split('/');
      if (parts[0] === 'push') {
        this.props.navigator.push(screen(parts[1]));
      }
    }
  }

  onNavBarButtonPress(id) {
    if (id === MORE_BUTTON) {
      this.setState({
        showModal: MORE_MODAL_KEY,
      });
    } else if (id === MENU_BUTTON) {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true,
      });
    }
  }

  onChatSelected = (chatId: number) => {
    if (chatId === '0') {
      this.props.navigator.push({
        ...screen('CHAT_SCREEN'),
        passProps: {
          isBot: true,
        },
      });
    } else {
      this.props.openChat(chatId);
      this.props.navigator.push(screen('PRIVATE_CHAT_SCREEN'));
    }
  };

  dismissModal = () => {
    this.setState({
      publicKey: '',
      profile: null,
      showModal: '',
      contacts: [],
      chatName: '',
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

  goToContactsPicker = () => {
    this.props.navigator.showModal({
      ...screen('CONTACTS_PICKER_SCREEN'),
      passProps: {
        onContactsSelected: this.onSelectContacts,
      },
    });
  };

  initiateNewChat = (contacts: Array<Contact>, chatName: string) => {
    this.props.startNewChat(
      contacts.map(contact => contact.profile.identityKey),
      chatName,
      (success) => {
        this.dismissModal();
        if (success === false) {
          this.props.fetchAllChats();
        } else {
          this.props.navigator.push(screen('CHAT_SCREEN'));
        }
      },
    );
  };

  onSelectContacts = (contacts: Array<Contact>) => {
    this.props.navigator.dismissModal();

    if (contacts.length === 1) {
      this.initiateNewChat(contacts, '');
    } else {
      this.setState({ contacts, showModal: CHAT_NAME_MODAL });
    }
  };

  buildChatName = (chat: ChatType) => {
    if (chat.name !== null) {
      return chat.name;
    }

    const partnerNames = chat.members
      .map(key => this.props.profiles[key])
      .filter(x => x != null)
      .map(profile => profile.name);
    const resultedName = partnerNames.join(', ');
    if (resultedName.length > 0) {
      return resultedName;
    }

    return 'Unknown account';
  };

  render() {
    const sortedChats = _.sortBy(this.props.chats, chat =>
      this.buildChatName(chat).toUpperCase());
    const groups = _.groupBy(sortedChats, chat =>
      this.buildChatName(chat)
        .toUpperCase()
        .charAt(0));
    const lucyBot = [{
      id: '0',
      name: 'Lucy 1.0',

      members: [],
      messages: [],
      unreadMessages: null,
    }];
    const mergerBotGroup = {
      lucy: lucyBot,
      ...groups,
    };
    const sections = _.map(mergerBotGroup, (group, key) => ({
      title: key,
      data: group,
    }));

    return (
      <View style={styles.nationsScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={styles.searchBarContainer}>
          <View style={styles.inputViewContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholder='Search by name, type or category...'
              placeholderTextColor={Colors.BitnationLinkOrangeColor}
              autoCapitalize='none'
            />
            <Image
              source={AssetsImages.searchIcon}
              style={styles.searchIconStyle}
            />
          </View>
        </View>
        <ScrollTabView
          initialPage={1}
          tabBarBackgroundColor={Colors.BitnationBlackAlphaColor}
          tabBarActiveTextColor={Colors.BitnationLinkOrangeColor}
          tabBarInactiveTextColor={Colors.BitnationLinkOrangeColor}
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          tabBarTextStyle={styles.tabBarTextStyle}
          renderTabBar={() => <DefaultTabBar />}
        >
          <View tabLabel='FEED' />
          <View tabLabel='TALK' style={styles.scrollView}>
            <SectionList
              renderItem={(item) => {
                const chat: ChatType = item.item;

                let chatImage = AssetsImages.avatarIcon;
                if (chat.members.length === 1) {
                  const partner = this.props.profiles[chat.members[0]];
                  if (partner != null) {
                    chatImage =
                      imageSource(partner.image) || AssetsImages.avatarIcon;
                  }
                } else {
                  chatImage = AssetsImages.ChatUI.groupChatIcon;
                }

                if (chat.id === '0') {
                  chatImage = AssetsImages.lucyIcon;
                }
                const messagePreview = ((message: GiftedChatMessageType | null) => {
                  if (message == null) return null;
                  if (message.dAppMessage == null) return message.text;
                  // @todo Add preview for DApp messages.
                  return i18n.t('screens.chat.dAppMessagePreview');
                }
                )(chat.messages.length === 0
                  ? null
                  : chat.messages[chat.messages.length - 1]);

                const lastMessage =
                  chat.messages.length === 0
                    ? {}
                    : chat.messages[chat.messages.length - 1];
                const dateString = lastMessage.createdAt;
                return (
                  <ChatListItem
                    name={this.buildChatName(chat)}
                    lastMessage={chat.id === '0' ? i18n.t('screens.chat.lucyInitialMessage') : messagePreview}
                    dateString={dateString}
                    avatar={chatImage}
                    onPress={this.onChatSelected}
                    unreadMessages={chat.unreadMessages}
                    id={chat.id}
                  />
                );
              }}
              keyExtractor={item => item.id}
              sections={sections}
              style={styles.sectionList}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
            />

            <InviteSentModal
              done={this.dismissModal}
              visible={this.state.showModal === INVITE_MODAL_KEY}
            />
            <Dialog.Container
              visible={this.state.showModal === CHAT_NAME_MODAL}
            >
              <Dialog.Title>
                {i18n.t('screens.chat.chatNameAlert.title')}
              </Dialog.Title>
              <Dialog.Input
                value={this.state.chatName}
                onChangeText={text => this.setState({ chatName: text })}
              />
              <Dialog.Button
                label={i18n.t('screens.chat.chatNameAlert.confirm')}
                disabled={this.state.chatName.length === 0}
                onPress={() =>
                  this.initiateNewChat(this.state.contacts, this.state.chatName)
                }
              />
              <Dialog.Button
                label={i18n.t('screens.chat.chatNameAlert.cancel')}
                onPress={this.dismissModal}
              />
            </Dialog.Container>
          </View>
          <View tabLabel='GROUPS' />
        </ScrollTabView>
        <LucyButton onPress={() => this.setState({ showModal: LUCY_MODAL_KEY })} />
        <PopOverModal
          visible={this.state.showModal === LUCY_MODAL_KEY}
          onCancel={this.dismissModal}
          desText='Welcome to Townhall! What would you like to do today?'
          options={[
            {
              text: 'Start new conversation',
              onPress: this.goToContactsPicker,
            },
            {
              text: i18n.t('screens.chat.menu.shareIdentityKey'),
              onPress: () => { this.dismissModal(); this.sharePublicKey(); },
            },
            {
              text: 'Help',
              onPress: () => {
                this.dismissModal();
                this.props.navigator.push({
                  ...screen('CHAT_SCREEN'),
                  passProps: {
                    isBot: true,
                  },
                });
              },
            },
          ]}
        />
        {this.state.loading === true && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chats: state.chat.chats,
  profiles: state.chat.partnerProfiles,
});

const mapDispatchToProps = dispatch => ({
  openChat: (chatId: number) => dispatch(openChat(chatId)),
  startNewChat: (members, chatName, callback) =>
    dispatch(startNewChat(members, chatName, callback)),
  fetchAllChats: () => dispatch(fetchAllChats()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListScreen);

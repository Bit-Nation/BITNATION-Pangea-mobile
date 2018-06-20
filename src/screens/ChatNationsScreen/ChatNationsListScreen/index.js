// @flow

import React from 'react';
import {
  View,
  SectionList,
  Clipboard,
} from 'react-native';
import _ from 'lodash';
import { Fab, Text } from 'native-base';
import ActionSheet from 'react-native-actionsheet';

import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import { screen } from '../../../global/Screens';
import ChatListItem from '../../../components/common/ChatListItem';
import NationListHeader from '../../../components/common/NationListHeader';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import i18n from '../../../global/i18n';
import AssetsImages from '../../../global/AssetsImages';
import type { NationIdType, NationType } from '../../../types/Nation';
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
   * @desc Selected Tab Name
   */
  selectedTab: string,
  /**
   * @desc List of all nations
   */
  nations: Array<NationType>,
  /**
   * @desc List of nations ids that the current user has joined to.
   */
  myNationIds: Array<NationIdType>,
  /**
   * @desc Function to be called when an item is selected from the list
   * @param id ID of the nation to be opened
   * @param isBot Flag to indicate if the selected channel is bot
   */
  onSelectItem: (id: number, isBot: boolean) => void,
};

type State = {
  /**
   * @desc User profile object
   */
  profile: any,
  /**
   * @desc Name of the modal to be shown
   */
  showModal: string
};

class ChatNationsListScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      profile: null,
      showModal: '',
    };
  }

  onChatAction = (index) => {
    switch (index) {
      case 0:
        // this.props.navigator.showModal({
        //   ...screen('NEW_CHAT_SCREEN'),
        // });
        this.getPublicKeyFromClipboard();
        break;
      default:
        break;
    }
  }

  getPublicKeyFromClipboard = async () => {
    const pubKey = await Clipboard.getString();
    console.log('pub key: ', pubKey);
    this.getUserProfile(pubKey);
  }

  getUserProfile = async (publicKey) => {
    try {
      const response = await ChatService.getProfile(publicKey);
      const profile = JSON.parse(response.profile);
      console.log('fetch profile: ', profile);
      this.setState({
        profile,
        showModal: 'new_chat',
      });
    } catch (e) {
      console.log('fetch error: ', e);
      this.setState({
        profile: null,
        showModal: 'invalid_key',
      });
    }
  }

  dismissModal = () => {
    this.setState({
      profile: null,
      showModal: '',
    });
  }

  showActionSheet = () => {
    this.actionSheet.show();
  }

  render() {
    const {
      selectedTab,
      nations,
      myNations,
      onSelectItem,
    } = this.props;
    const nationsToDisplay = selectedTab === 'ALL_NATIONS' ?
      _.filter(nations, nation => nation.idInSmartContract >= 0)
      :
      _.filter(nations, nation => (
        _.indexOf(myNations, nation.id) !== -1) && (nation.idInSmartContract >= 0));
    const sortedNations = _.sortBy(nationsToDisplay, nation => nation.nationName);
    const groups = _.groupBy(sortedNations, nation => nation.nationName.charAt(0));
    let sections = _.map(groups, (group, key) => ({
      title: key,
      data: group,
    }));
    const bots = [{ title: 'Bots', data: [{ name: 'Dr. FreudBot', isBot: true, id: 0 }] }];
    sections = bots.concat(sections);

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
            const nation = item.item;
            if (nation.isBot === true) {
              return (<ChatListItem
                text={nation.name}
                participants=''
                itemIcon={AssetsImages.ChatUI.botIcon}
                onPress={id => onSelectItem(id, true)}
                id={nation.id}
              />);
            }
              return (<ChatListItem
                text={nation.nationName}
                participants=''
                itemIcon={0}
                onPress={id => onSelectItem(id, false)}
                id={nation.id}
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
          onSendInvite={() => {}}
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

export default ChatNationsListScreen;

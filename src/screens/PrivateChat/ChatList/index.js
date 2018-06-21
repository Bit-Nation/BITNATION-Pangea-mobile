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
   * @desc List of all contacts
   */
  contacts: Array<NationType>,
  /**
   * @desc Function to be called when an item is selected from the list
   * @param id ID of the contact to be opened
   */
  onSelectItem: (id: number) => void,
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

class ChatListScreen extends React.Component<Props, State> {
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
    await this.getUserProfile(pubKey);
    await this.getPrekeyBundle(pubKey);
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

  getPrekeyBundle = async (publicKey) => {
    try {
      const response = await ChatService.getPreKeyBundle(publicKey);
      const bundle = JSON.parse(response.bundle);
      console.log('fetch bundle: ', bundle);
    } catch (e) {
      console.log('fetch error: ', e);
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
      contacts,
      onSelectItem,
    } = this.props;
    const sortedContacts = _.sortBy(contacts, contact => contact.name);
    const groups = _.groupBy(sortedContacts, contact => contact.name.charAt(0));
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
            const contact = item.item;
            return (<ChatListItem
              text={contact.name}
              participants=''
              itemIcon={0}
              onPress={id => onSelectItem(id)}
              id={contact.id}
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
          onStartChat={() => {}}
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

export default ChatListScreen;

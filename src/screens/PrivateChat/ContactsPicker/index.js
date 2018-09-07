// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  Image,
} from 'react-native';
import { Text } from 'native-base';
import { getProfile, newChatSession } from '../../../actions/chat';
import { addContact } from '../../../actions/contacts';
import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';
import Colors from '../../../global/colors';
import ScreenTitle from '../../../components/common/ScreenTitle';
import InvalidKeyModal from './InvalidKeyModal';
import AssetsImage from '../../../global/AssetsImages';
import { imageSource } from '../../../utils/profile';

import { Chip, Selectize } from 'react-native-material-selectize';

const DONE_BUTTON = 'DONE_BUTTON';
const INVALID_MODAL_KEY = 'invalidKey';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc List of all contacts
   */
  contacts: Array<*>,
  /**
   * @desc Function to get user profile
   * @param {string} identityKey Identity key of user.
   * @param {function} callback Callback
   */
  getProfile: (identityKey: string, callback: (profile: (ProfileType | null), error: (Error | null)) => void) => void,
  /**
   * @desc Function to add a new contact
   * @param {string} identityKey Identity key of user.
   * @param {function} callback Callback
   */
  addContact: (identityKey: string, callback: (error: Error | null) => void) => void,
  /**
   * @desc Function to initialize a new chat
   * @param {ProfileType} profile Profile of the user
   * @param {func} callback
   */
  createNewSession: (profile: ProfileType, callback: (result: Object) => void) => void,
};

type State = {
  /**
   * @desc Name of the modal to be shown
   */
  showModal: string,
  /**
   * @desc Flag whether loading is in progress.
   */
  loading: boolean,
  /**
   * @desc Error message for adding contact failure.
   */
  addContactError: string,
};

class ContactsPickerScreen extends NavigatorComponent<Props, State> {
  static navigatorButtons = {
    leftButtons: [],
    rightButtons: [{
      title: 'Done',
      id: DONE_BUTTON,
      buttonColor: Colors.navigationButtonColor,
    }],
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: '',
      loading: false,
      addContactError: '',
    };
  }

  onNavBarButtonPress(id) {
    if (id === DONE_BUTTON) {
      const selectedContacts = this.selectize.getSelectedItems().result;
      if (selectedContacts.length) {
        // @todo Create a new chat session from selected contacts
      }
    }
  }

  componentDidUpdate(prevProps) {
    // @todo Select new contact
    if (this.props.contacts.length > prevProps.contacts.length) {
      // this.selectize._selectItem(newContact.id)
    }
  }

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

  addContact = async () => {
    try {
      this.setState({ loading: true });
      const profile = await this.getPublicKeyFromClipboard();
      this.props.addContact(profile.identityKey, (error) => {
        if (error) {
          this.setState({addContactError: error});
        }
        else {
          this.setState({addContactError: ''});
        }
      });
    } catch (error) {
      this.setState({
        showModal: INVALID_MODAL_KEY,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  dismissModal = () => {
    this.setState({
      showModal: '',
    });
  };

  render() {
    return (
      <View style={styles.nationsScreenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.contactsPicker.title')} />
        <ScrollView>
          <Selectize
            ref={selectize => this.selectize = selectize}
            chipStyle={styles.chip}
            chipIconStyle={styles.chipIcon}
            label='To:'
            itemId='id'
            items={this.props.contacts}
            showItems='always'
            error={this.state.addContactError}
            middleComponent={
              <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this.addContact}
                  style={styles.listRow}>
                <View style={styles.listWrapper}>
                  <View style={styles.listIcon}>
                    <Image
                      source={AssetsImage.avatarIcon}
                      style={styles.avatarSmall}
                    />
                  </View>
                  <View style={styles.listIcon}>
                    <Text>
                      {i18n.t('screens.contactsPicker.newContactFromClipboard')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
            renderRow={(id, onPress, item) => (
              <TouchableOpacity
                  activeOpacity={0.6}
                  key={id}
                  onPress={onPress}
                  style={styles.listRow}>
                <View style={styles.listWrapper}>
                  <View style={styles.listIcon}>
                    <Image
                      source={imageSource(item.profile.image) || AssetsImage.avatarIcon}
                      style={styles.avatarSmall}
                    />
                  </View>
                  <View style={styles.listIcon}>
                    <Text style={styles.listPrimaryText}>{item.profile.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            renderChip={(id, onClose, item, style, iconStyle) => (
              <Chip
                key={id}
                iconStyle={iconStyle}
                onClose={onClose}
                text={item.profile.name}
                style={style}
              />
            )}
          />
        </ScrollView>

        <InvalidKeyModal
          done={this.dismissModal}
          visible={this.state.showModal === INVALID_MODAL_KEY}
        />

        {this.state.loading === true && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.contacts.map(contact => ({
    id: contact.profile.identityKey,
    ...contact
  })),
});

const mapDispatchToProps = dispatch => ({
  getProfile: (profile, callback) => dispatch(getProfile(profile, callback)),
  addContact: (identityKey, callback) => dispatch(addContact(identityKey, callback)),
  createNewSession: (profile, callback) => dispatch(newChatSession(profile, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPickerScreen);

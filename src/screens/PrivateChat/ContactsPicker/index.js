// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import { newChatSession } from '../../../actions/chat';
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
    };
  }

  onNavBarButtonPress(id) {
    if (id === DONE_BUTTON) {
      const selectedContacts = this._selectize.getSelectedItems().result;
      if (selectedContacts.length) {
        // @todo Create a new chat session from selected contacts
      }
    }
  }

  componentDidUpdate(prevProps) {
    // @todo Select new contact
    if (this.props.contacts.length > prevProps.contacts.length) {
      // this._selectize._selectItem(newContact.id)
    }
  }

  _addContact = async () => {
    try {
      this.setState({ loading: true });
      const profile = await this.getPublicKeyFromClipboard();
      this.props.addContact(profile.identityKey, (error) => {
        if (error) {
          // TODO: Handle error
          console.log('ADD CONTACT ERROR: ', error);
        }
      })
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

  _dismissModal = () => {
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
            ref={selectize => this._selectize = selectize}
            chipStyle={styles.chip}
            chipIconStyle={styles.chipIcon}
            label='To:'
            itemId='id'
            items={this.props.contacts}
            showItems='always'
            middleComponent={
              <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={this._addContact}
                  style={styles.listRow}>
                <View style={styles.listWrapper}>
                  <View style={styles.listIcon}>
                    {/* @todo Handle image for adding contact from clipboard */}
                    <Text style={styles.listInitials}></Text>
                  </View>
                  <View>
                    <Text style={styles.listNameText}>{i18n.t('screens.contactsPicker.newContactFromClipboard')}</Text>
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
                    {/* @todo Handle contact image */}
                    <Text style={styles.listInitials}>{item.profile.image}</Text>
                  </View>
                  <View>
                    <Text style={styles.listNameText}>{item.profile.name}</Text>
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
          done={this._dismissModal}
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
  addContact: (identityKey, callback) => dispatch(addContact(identityKey, callback)),
  createNewSession: (profile, callback) => dispatch(newChatSession(profile, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPickerScreen);

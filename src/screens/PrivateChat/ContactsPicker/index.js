// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  Clipboard,
} from 'react-native';
import _ from 'lodash';
import { Chip, Selectize } from 'react-native-material-selectize';
import { addContact } from '../../../actions/contacts';
import BackgroundImage from '../../../components/common/BackgroundImage';
import styles from './styles';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import Loading from '../../../components/common/Loading';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';
import Colors from '../../../global/colors';
import type { Contact } from '../../../types/Contacts';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import ScreenTitle from '../../../components/common/ScreenTitle';
import InvalidKeyModal from './InvalidKeyModal';
import AssetsImage from '../../../global/AssetsImages';
import { imageSource } from '../../../utils/profile';
import ListItem from '../../../components/common/ListItem';

const DONE_BUTTON = 'DONE_BUTTON';
const INVALID_MODAL_KEY = 'invalidKey';
const DISABLED_RIGHT_BUTTON = {
  title: 'Done',
  id: DONE_BUTTON,
  buttonColor: Colors.navigationButtonColor,
  disabled: true,
};
const ADD_CONTACT_ERROR = 'Error adding contact, please try again later.';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
  /**
   * @desc List of all contacts.
   */
  contacts: Array<Contact>,
  /**
   * @desc List of initially selected contacts.
   */
  initialSelectedContacts: Array<Contact>,
  /**
   * @desc Function to add a new contact
   * @param {string} identityKey Identity key of user.
   * @param {function} callback Callback
   */
  addContact: (identityKey: string, callback: (error: Error | null) => void) => void,
  /**
   * @desc Callback function to call when submitting contact selection.
   */
  onContactsSelected: (selectedContacts: Array<Contact>) => void,
};

type State = {
  /**
   * @desc The identityKey of the added contact.
   */
  addedContactIdentityKey: string,
  /**
   * @desc Name of the modal to be shown.
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
  /**
   * @desc Flag whether done button is disabled.
   */
  doneBtnDisabled: boolean,
};

class ContactsPickerScreen extends NavigatorComponent<Props, State> {
  static navigatorButtons = {
    leftButtons: [],
    rightButtons: [DISABLED_RIGHT_BUTTON],
  };

  static defaultProps = {
    initialSelectedContacts: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      addedContactIdentityKey: '',
      showModal: '',
      loading: false,
      addContactError: '',
      doneBtnDisabled: true,
    };
  }

  selectize: Selectize;

  onNavBarButtonPress(id) {
    if (id === DONE_BUTTON) {
      const selectedContacts = this.selectize.getSelectedItems().result;
      this.props.onContactsSelected(selectedContacts);
    }
  }

  componentDidMount() {
    if (this.props.initialSelectedContacts.length > 0) {
      this.enableDoneButton();

      this.props.initialSelectedContacts.forEach((contact) => {
        this.selectize._selectItem(contact.profile.identityKey);
      });
    }
  }

  componentDidUpdate() {
    const addedContact = _.find(this.props.contacts, (contact) => {
      const { identityKey } = contact.profile;
      const { addedContactIdentityKey } = this.state;
      return identityKey === addedContactIdentityKey;
    });

    if (addedContact) {
      this.selectize._selectItem(addedContact.profile.identityKey);
      this.setState({ addedContactIdentityKey: '' });
      this.enableDoneButton();
    }
  }

  enableDoneButton = () => {
    if (this.state.doneBtnDisabled) {
      this.props.navigator.setButtons({
        rightButtons: [{
          ...DISABLED_RIGHT_BUTTON,
          disabled: false,
        }],
      });
      this.setState({ doneBtnDisabled: false });
    }
  }

  disableDoneButton = () => {
    if (!this.state.doneBtnDisabled) {
      this.props.navigator.setButtons({
        rightButtons: [DISABLED_RIGHT_BUTTON],
      });
      this.setState({ doneBtnDisabled: true });
    }
  }

  addContact = async () => {
    try {
      this.setState({ loading: true });
      const publicKey = await Clipboard.getString();
      this.props.addContact(publicKey, (error) => {
        this.setState({
          addContactError: error ? ADD_CONTACT_ERROR : '',
          addedContactIdentityKey: publicKey,
          loading: false,
        });
      });
    } catch (error) {
      this.setState({
        addContactError: ADD_CONTACT_ERROR,
        loading: false,
      });
    }
  }

  onContactSelect = (selectContact: () => void) => {
    selectContact();
    this.enableDoneButton();
  }

  onChipClose = (closeChip: () => void) => {
    closeChip();
    if (this.selectize.getSelectedItems().result.length === 0) {
      this.disableDoneButton();
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
            ref={(selectize) => { this.selectize = selectize; }}
            chipStyle={styles.chip}
            chipIconStyle={styles.chipIcon}
            label='To:'
            itemId='id'
            filterOnKey='name'
            items={this.props.contacts.map(contact => ({
              id: contact.profile.identityKey,
              name: contact.profile.name,
              ...contact,
            }))}
            showItems='always'
            error={this.state.addContactError}
            listStyle={styles.list}
            baseColor={Colors.BitnationLinkOrangeColor}
            tintColor={Colors.BitnationLinkOrangeColor}
            middleComponent={
              <ListItem
                iconSource={AssetsImage.avatarIcon}
                text={i18n.t('screens.contactsPicker.newContactFromClipboard')}
                onPress={this.addContact}
                disclosureIconVisible={false}
              />
            }
            renderRow={(id, onPress, item) => (
              <ListItem
                key={id}
                iconSource={imageSource(item.profile.image) || AssetsImage.avatarIcon}
                text={item.profile.name}
                onPress={() => this.onContactSelect(onPress)}
                disclosureIconVisible={false}
              />
            )}
            renderChip={(id, onClose, item, style, iconStyle) => (
              <Chip
                key={id}
                iconStyle={iconStyle}
                onClose={() => this.onChipClose(onClose)}
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
  contacts: state.contacts.contacts,
});

const mapDispatchToProps = dispatch => ({
  addContact: (identityKey, callback) => dispatch(addContact(identityKey, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPickerScreen);

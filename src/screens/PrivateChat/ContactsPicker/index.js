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
import styles from './styles';
import Loading from '../../../components/common/Loading';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import i18n from '../../../global/i18n';
import Colors from '../../../global/colors';
import type { Contact } from '../../../types/Contacts';
import type { Navigator } from '../../../types/ReactNativeNavigation';
import AssetsImages from '../../../global/AssetsImages';
import { imageSource } from '../../../utils/profile';
import ListItem from '../../../components/common/ListItem';

const DONE_BUTTON = 'DONE_BUTTON';
const DISABLED_RIGHT_BUTTON = {
  title: i18n.t('screens.contactsPicker.doneButton'),
  id: DONE_BUTTON,
  buttonColor: Colors.navigationButtonColor,
  disabled: true,
};
const ADD_CONTACT_ERROR = i18n.t('screens.contactsPicker.addContactError');

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
   * @desc The list of selected contacts.
   */
  selectedContacts: Array<Contact>,
  /**
   * @desc The identityKey of the added contact.
   */
  addedContactIdentityKey: string,
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
    leftButtons: [{
      id: 'cancel',
      icon: AssetsImages.closeIcon,
      title: i18n.t('common.cancel'),
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [DISABLED_RIGHT_BUTTON],
  };

  static defaultProps = {
    initialSelectedContacts: [],
    onContactsSelected: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedContacts: [...this.props.initialSelectedContacts],
      addedContactIdentityKey: '',
      loading: false,
      addContactError: '',
    };
  }

  selectize: Selectize;

  onNavBarButtonPress(id) {
    switch (id) {
      case DONE_BUTTON:
        this.props.onContactsSelected(this.state.selectedContacts);
        break;
      case 'cancel':
        this.props.navigator.dismissModal();
        break;
      default:
        break;
    }
  }

  componentDidUpdate() {
    if (this.state.addedContactIdentityKey !== '') {
      const addedContact = _.find(
        this.props.contacts,
        contact => contact.profile.identityKey === this.state.addedContactIdentityKey,
      );

      if (addedContact !== undefined) {
        this.selectize._selectItem(addedContact.profile.identityKey);
        this.setState({ addedContactIdentityKey: '' });
      }
    }

    const doneButtonDisabled = (
      this.state.selectedContacts.length === 0 ||
      _.isEqual(this.state.selectedContacts, this.props.initialSelectedContacts)
    );
    this.changeDoneButtonDisabled(doneButtonDisabled);
  }

  changeDoneButtonDisabled = (disabled: boolean) => {
    this.props.navigator.setButtons({
      rightButtons: [{
        ...DISABLED_RIGHT_BUTTON,
        disabled,
      }],
    });
  };

  addContact = async () => {
    try {
      this.setState({ loading: true });

      const publicKey = await Clipboard.getString();

      this.props.addContact(publicKey, (error) => {
        if (error !== null) {
          this.setState({
            addContactError: ADD_CONTACT_ERROR,
            loading: false,
          });

          return;
        }

        this.setState({
          addContactError: '',
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
  };

  parseContacts = contacts => (
    contacts.map(contact => ({
      id: contact.profile.identityKey,
      name: contact.profile.name,
      ...contact,
    }))
  );

  onChangeSelectedItems = (selectedItems) => {
    const selectedContacts = this.props.contacts.filter(contact => (
      selectedItems.result.includes(contact.profile.identityKey)
    ));
    this.setState({ selectedContacts });
  };

  onSubmitEditing = () => (
    // If there are no contacts then this will return `false`
    // which prevents Selectize from creating the item.
    this.props.contacts.length > 0
  )

  render() {
    return (
      <View style={[styles.screenContainer, styles.modalScreenBackground]}>
        <ScrollView
          contentContainerStyle={[styles.bodyContainer, styles.noflex]}
          keyboardShouldPersistTaps='handled'
        >
          <Selectize
            ref={(selectize) => {
              this.selectize = selectize;
            }}
            chipStyle={styles.chip}
            chipIconStyle={styles.chipIcon}
            label={i18n.t('screens.contactsPicker.label')}
            itemId='id'
            filterOnKey='name'
            selectedItems={this.parseContacts(this.props.initialSelectedContacts)}
            items={this.parseContacts(this.props.contacts)}
            onChangeSelectedItems={this.onChangeSelectedItems}
            showItems='always'
            error={this.state.addContactError}
            listStyle={styles.list}
            baseColor={Colors.BitnationLinkOrangeColor}
            tintColor={Colors.BitnationLinkOrangeColor}
            textInputProps={{
              onSubmitEditing: this.onSubmitEditing,
            }}
            middleComponent={
              <ListItem
                iconSource={AssetsImages.avatarIcon}
                text={i18n.t('screens.contactsPicker.newContactFromClipboard')}
                onPress={this.addContact}
                disclosureIconVisible={false}
                style={[styles.listItem, styles.middleListItem]}
              />
            }
            renderRow={(id, onPress, item) => (
              <ListItem
                key={id}
                iconSource={imageSource(item.profile.image) || AssetsImages.avatarIcon}
                text={item.profile.name}
                onPress={onPress}
                disclosureIconVisible={false}
                style={styles.listItem}
              />
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

import React from 'react';
import {
  View,
  Text, ScrollView, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import BackgroundImage from '../../../components/common/BackgroundImage';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/Colors';
import { ActionSheet } from 'native-base';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import styles from "../../ProfileScreen/EditProfile/styles";

const DONE_BUTTON = 'DONE_BUTTON';

class CreateNation extends NavigatorComponent {

  constructor(props) {
    super(props);

    this.actionSheet = null;
    this._setNavigationButtons(false);
  }

  _setNavigationButtons(saveEnabled) {
    this.props.navigator.setButtons(
      {
        leftButtons: [{
          title: 'Cancel',
          id: 'cancel',
          buttonColor: Colors.navigationColor,
        }],
        rightButtons: [{
          title: 'Done',
          id: DONE_BUTTON,
          disabled: !saveEnabled,
          buttonColor: Colors.navigationColor,
        }],
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const saveWasEnabled = this._saveShouldBeEnabled(this.props);
    const saveWillBeEnabled = this._saveShouldBeEnabled(nextProps);
    if (saveWasEnabled !== saveWillBeEnabled) {
      this._setNavigationButtons(saveWillBeEnabled);
    }
  };

  onNavBarButtonPress(id) {
    if (id === 'cancel') {
      this.props.onCancelNationCreation();
    }
    if (id === DONE_BUTTON) {
      this.props.onDoneNationCreation();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        {/* {this._buildHeader()} */}
      </View>
    );
  }

};

CreateNation.propTypes = {
  onCancelNationCreation: PropTypes.func.isRequired,
  onDoneNationCreation: PropTypes.func.isRequired,
};

export default CreateNation;
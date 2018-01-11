import React, { Component } from 'react';
import {
  View, TouchableOpacity, Alert, Platform, ScrollView
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { screen } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import Text from '../../../../components/common/Text';
import GridView from '../../../../components/GridView';
import Button from '../../../../components/common/Button';
import PrivateKeyTextInputContainer from '../../../../components/PrivateKeyTextInputContainer';
import { KEY_ROW_COUNT, KEY_COLUMN_COUNT } from '../../../../global/Constants';
import CreateKeyBaseScreen from '../CreateKeyBaseScreen/index';

const DONE_BUTTON = 'DONE_BUTTON';

class CreateKeyStep3 extends CreateKeyBaseScreen {

  constructor(props) {
    super(props);

    this.state = {
      activeRow: 0,
      lastRowReached: false,
    };

    this._configureNavigation();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.lastRowReached !== nextState.lastRowReached) {
      this._configureNavigation(nextState.lastRowReached);
    }
  }

  _configureNavigation(enabled) {
    this.props.navigator.setButtons({
      rightButtons: [{
        id: DONE_BUTTON,
        title: 'Done',
        disabled: !enabled,
      }],
    });
  }

  onNavBarButtonPress(id) {
    super.onNavBarButtonPress(id);

    if (id === DONE_BUTTON) {
      this.props.navigator.push(screen('CREATE_KEY_SUCCESS_SCREEN'));
    }
  }

  onNextPressed = () => {
    this.setState((prevState) => {
      const nextRow = Math.min(prevState.activeRow + 1, KEY_ROW_COUNT - 1);

      return {
        ...prevState,
        activeRow: nextRow,
        lastRowReached: nextRow === KEY_ROW_COUNT - 1,
      };
    });
  };

  onPreviousPressed = () => {
    this.setState((prevState) => {
      return { ...prevState, activeRow: Math.max(prevState.activeRow - 1, 0) };
    });
  };

  _renderText = (index) => {
    return (
      <PrivateKeyTextInputContainer
        editable={false}
        index={index}
        value={this.props.createdMnemonic && this.props.createdMnemonic[index]}
        label={(index + 1).toString()}
        key={index}
        style={{ marginLeft: (index % KEY_COLUMN_COUNT === 0) ? 0 : 10 }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage/>
        <FakeNavigationBar/>
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          <View>
            <View style={styles.instructionContainer}>
              <Text messageText style={styles.instruction}>
                We will show you a group of 24 words that is the private key that unlocks your wallet.
              </Text>
            </View>
            <View style={styles.gridContainer}>
              <GridView
                itemsPerRow={KEY_COLUMN_COUNT}
                rowsCount={4}
                renderItem={this._renderText}
                activeRow={this.state.activeRow}
                disableInactiveRows
                style={styles.gridView}
              />
            </View>
            <View style={styles.instructionContainer}>
              <Text messageText style={styles.instruction}>
                Write the words on paper, in order. Store the paper in very safe place. If your device is lost, stolen,
                broken, or upgraded, you must have this key to restore or unlock your wallet.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Previous'
                      onPress={this.onPreviousPressed}
                      style={styles.button}/>
              <Button title='Next'
                      onPress={this.onNextPressed}
                      style={styles.button}/>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

}

const mapStateToProps = state => ({
  ...state.wallet,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyStep3);
import React, { Component } from 'react';
import {
  View, TouchableOpacity, Alert, Platform, ScrollView,
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
import {
  KEY_ROW_COUNT, KEY_COLUMN_COUNT, KEY_PAGE_ROW_COUNT, KEY_PAGE_LENGTH, KEY_PAGE_COUNT,
} from '../../../../global/Constants';
import KeyBaseScreen from '../../KeyBaseScreen/index';
import { removePrivateKey } from '../../../../actions/key';
import Colors from '../../../../global/Colors';

const DONE_BUTTON = 'DONE_BUTTON';

class CreateKeyProcessScreen extends KeyBaseScreen {

  constructor(props) {
    super(props);

    this.state = {
      activeRow: 0,
      completedPages: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const prevPage = this.activePage(prevState);
    const currentPage = this.activePage(this.state);
    if (prevPage < currentPage && this.state.completedPages.indexOf(prevPage) === -1) {
      this._showPageCompletedAlert(prevPage, this.isDone(this.state));
    }
  }

  _showPageCompletedAlert(completedPage, done) {
    Alert.alert(
      `Group ${completedPage + 1} finished!`,
      done ? '' : `Good work! Now, write down next group of ${KEY_PAGE_LENGTH} words.`,
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState(prevState => {
              return {
                completedPages: [...prevState.completedPages, completedPage],
              };
            });
            if (done) {
              this.onDone();
            }
          },
        },
      ],
      { cancelable: false });
  }

  activePage = (state) => {
    return Math.floor(state.activeRow / KEY_PAGE_ROW_COUNT);
  };

  isDone = (state) => {
    return this.activePage(state) === KEY_PAGE_COUNT;
  };

  onDone = () => {
    this.props.navigator.push(screen('VERIFY_KEY_INSTRUCTION_SCREEN'));
  };

  onNextPressed = () => {
    this.setState((prevState) => {
      const nextRow = prevState.activeRow + 1;

      return {
        activeRow: nextRow,
      };
    });
  };

  onPreviousPressed = () => {
    this.setState((prevState) => {
      return { activeRow: Math.max(prevState.activeRow - 1, 0) };
    });
  };

  _renderText = (index) => {
    index += this.activePage(this.state) * KEY_PAGE_LENGTH;
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
        <View style={styles.contentContainer}>
          <View style={styles.instructionContainer}>
            <Text messageText style={styles.instruction}>
              Write each row of words on the piece of paper. Press “Next” when you have written the row.
            </Text>
          </View>
          <View style={styles.gridContainer}>
            <GridView
              itemsPerRow={KEY_COLUMN_COUNT}
              rowsCount={KEY_PAGE_ROW_COUNT}
              renderItem={this._renderText}
              activeRow={this.isDone(this.state) ? -1 : this.state.activeRow % KEY_PAGE_ROW_COUNT}
              disableInactiveRows
              style={styles.gridView}
            />
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
      </View>
    );
  }

}

const mapStateToProps = state => ({
  ...state.key,
});

const mapDispatchToProps = dispatch => ({
  removePrivateKey() {
    dispatch(removePrivateKey());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateKeyProcessScreen);
// @flow

import React from 'react';
import {
  View,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import { screen } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import PanelView from '../../../../components/common/PanelView';
import GridView from '../../../../components/GridView';
import Button from '../../../../components/common/Button';
import PrivateKeyTextInputContainer from '../../../../components/PrivateKeyTextInputContainer';
import { KEY_COLUMN_COUNT, KEY_PAGE_ROW_COUNT, KEY_PAGE_LENGTH, KEY_PAGE_COUNT } from '../../../../global/Constants';
import KeyBaseScreen from '../../KeyBaseScreen/index';
import { removePrivateKey } from '../../../../actions/key';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';
import type { State as KeyState } from '../../../../reducers/key';

type Actions = {
  /**
   * @desc Function to abort private key creation process.
   */
  removePrivateKey: () => void,
}

type State = {
  /**
   * @desc Number of active row in grid row.
   */
  activeRow: number,
  /**
   * @desc Array of completed page numbers.
   */
  completedPages: Array<number>,
}

class CreateKeyProcessScreen extends KeyBaseScreen<Actions & KeyState, State> {
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
      this.showPageCompletedAlert(prevPage, this.isDone(this.state));
    }
  }

  showPageCompletedAlert(completedPage, done) {
    Alert.alert(
      i18n.t('alerts.privateKeyGroupCompleted.title', { number: completedPage + 1 }),
      done ? '' : i18n.t('alerts.privateKeyGroupCompleted.subtitle', { KEY_PAGE_LENGTH }),
      [
        {
          text: i18n.t('alerts.privateKeyGroupCompleted.confirm'),
          onPress: () => {
            this.setState(prevState => ({
              completedPages: [...prevState.completedPages, completedPage],
            }));
            if (done) {
              this.onDone();
            }
          },
        },
      ],
      { cancelable: false },
    );
  }

  activePage = state => Math.floor(state.activeRow / KEY_PAGE_ROW_COUNT);

  isDone = state => this.activePage(state) === KEY_PAGE_COUNT;

  onDone = () => {
    if (this.props.navigator) {
      this.props.navigator.push(screen('VERIFY_KEY_INSTRUCTION_SCREEN'));
    }
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
    this.setState(prevState => ({ activeRow: Math.max(prevState.activeRow - 1, 0) }));
  };

  renderText = (biasedIndex) => {
    const index = biasedIndex + (this.activePage(this.state) * KEY_PAGE_LENGTH);
    return (
      <PrivateKeyTextInputContainer
        editable={false}
        index={index}
        value={this.props.createdMnemonic && this.props.createdMnemonic[index]}
        label={(index + 1).toString()}
        key={index}
        style={index % KEY_COLUMN_COUNT === 0 ? styles.firstTextInput : styles.textInput}
      />
    );
  };

  render() {
    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />

        <View style={styles.bodyContainer}>
          <View style={styles.bodyTopSpacer} />

          <PanelView
            style={styles.panelViewTransparent}
            childrenContainerStyle={styles.noflex}
          >

            <BodyParagraphs paragraphs={i18n.t('screens.createKey.process.instructions')} />

            <View style={styles.gridContainer}>
              <GridView
                itemsPerRow={KEY_COLUMN_COUNT}
                rowsCount={KEY_PAGE_ROW_COUNT}
                renderItem={this.renderText}
                activeRow={this.isDone(this.state)
                  ? -1
                  : this.state.activeRow % KEY_PAGE_ROW_COUNT}
                disableInactiveRows
                style={styles.gridView}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={i18n.t('screens.createKey.process.previousButton')}
                onPress={this.onPreviousPressed}
                style={styles.button}
                enabled={this.state.activeRow > 0}
              />
              <Button
                title={i18n.t('screens.createKey.process.nextButton')}
                onPress={this.onNextPressed}
                style={styles.button}
              />
            </View>

          </PanelView>
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

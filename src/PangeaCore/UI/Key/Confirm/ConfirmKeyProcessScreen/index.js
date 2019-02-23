// @flow

import React from 'react';
import {
  View,
  Alert,
} from 'react-native';

import styles from './styles';
import { androidNavigationButtons, screen } from '../../../../global/Screens';
import BackgroundImage from '../../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../../components/common/FakeNavigationBar';
import PanelView from '../../../../components/common/PanelView';
import GridView from '../../../../components/GridView';
import Button from '../../../../components/common/Button';
import PrivateKeyTextInputContainer from '../../../../components/PrivateKeyTextInputContainer';
import { KEY_COLUMN_COUNT, KEY_PAGE_ROW_COUNT, KEY_PAGE_LENGTH, KEY_PAGE_COUNT } from '../../../../global/Constants';
import BodyParagraphs from '../../../../components/common/BodyParagraphs';
import i18n from '../../../../global/i18n';
import NavigatorComponent from '../../../../components/common/NavigatorComponent';
import type { Mnemonic } from '../../../../types/Mnemonic';
import type { NavigatorProps } from '../../../../components/common/NavigatorComponent';
import AccountsService from '../../../../services/accounts';
import { errorAlert } from '../../../../global/alerts';

type State = {
  /**
   * @desc Number of active row in grid row.
   */
  activeRow: number,
  /**
   * @desc Array of completed page numbers.
   */
  completedPages: Array<number>,
  /**
   * @desc Mnemonic for current account private key.
   */
  mnemonic: Mnemonic,
}

class ConfirmKeyProcessScreen extends NavigatorComponent<void, State> {
  static navigatorButtons = { ...androidNavigationButtons };

  constructor(props: NavigatorProps & void) {
    super(props);

    this.state = {
      activeRow: 0,
      completedPages: [],
      mnemonic: [],
    };

    AccountsService.getMnemonic().then((mnemonic) => {
      this.setState({ mnemonic });
    }).catch((error) => {
      errorAlert(error);
    });
  }

  componentDidUpdate(prevProps: void, prevState: State) {
    const prevPage = this.activePage(prevState);
    const currentPage = this.activePage(this.state);
    if (prevPage < currentPage && this.state.completedPages.indexOf(prevPage) === -1) {
      this.showPageCompletedAlert(prevPage, this.isDone(this.state));
    }
  }

  showPageCompletedAlert(completedPage: number, done: boolean) {
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

  activePage = (state: State) => Math.floor(state.activeRow / KEY_PAGE_ROW_COUNT);

  isDone = (state: State) => this.activePage(state) === KEY_PAGE_COUNT;

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

  renderText = (biasedIndex: number) => {
    const index = biasedIndex + (this.activePage(this.state) * KEY_PAGE_LENGTH);
    return (
      <PrivateKeyTextInputContainer
        editable={false}
        index={index}
        value={this.state.mnemonic[index]}
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

            <BodyParagraphs paragraphs={i18n.t('screens.confirmKey.process.instructions')} />

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
                title={i18n.t('screens.confirmKey.process.previousButton')}
                onPress={this.onPreviousPressed}
                style={styles.button}
                enabled={this.state.activeRow > 0}
              />
              <Button
                title={i18n.t('screens.confirmKey.process.nextButton')}
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

export default ConfirmKeyProcessScreen;

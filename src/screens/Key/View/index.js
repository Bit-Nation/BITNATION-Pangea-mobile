// @flow

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import PanelView from '../../../components/common/PanelView';
import GridView from '../../../components/GridView/index';
import Button from '../../../components/common/Button';
import PrivateKeyTextInputContainer from '../../../components/PrivateKeyTextInputContainer/index';
import { KEY_COLUMN_COUNT, KEY_PAGE_ROW_COUNT, KEY_PAGE_LENGTH, KEY_ROW_COUNT } from '../../../global/Constants';
import KeyBaseScreen from '../KeyBaseScreen/index';
import { removePrivateKey } from '../../../actions/key';
import BodyParagraphs from '../../../components/common/BodyParagraphs';
import i18n from '../../../global/i18n';
import type { State as KeyState } from '../../../reducers/key';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import type { Mnemonic } from '../../../types/Mnemonic';
import AccountsService from '../../../services/accounts';
import { errorAlert } from '../../../global/alerts';

type State = {
  /**
   * @desc Number of active row in grid row.
   */
  activeRow: number,
  /**
   * @desc Mnemonic for current account private key.
   */
  mnemonic: Mnemonic,
}

class ViewPrivateKeyScreen extends NavigatorComponent<KeyState, State> {
  constructor(props) {
    super(props);

    this.state = {
      activeRow: 0,
      mnemonic: [],
    };

    AccountsService.getMnemonic().then((mnemonic) => {
      this.setState({ mnemonic });
    }).catch((error) => {
      errorAlert(error);
    });
  }

  activePage = state => Math.floor(state.activeRow / KEY_PAGE_ROW_COUNT);

  onNextPressed = () => {
    this.setState(prevState => ({ activeRow: Math.min(prevState.activeRow + 1, KEY_ROW_COUNT - 1) }));
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

            <BodyParagraphs paragraphs={i18n.t('screens.viewPrivateKey.instructions')} />

            <View style={styles.gridContainer}>
              <GridView
                itemsPerRow={KEY_COLUMN_COUNT}
                rowsCount={KEY_PAGE_ROW_COUNT}
                renderItem={this.renderText}
                activeRow={this.state.activeRow % KEY_PAGE_ROW_COUNT}
                disableInactiveRows
                style={styles.gridView}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={i18n.t('screens.viewPrivateKey.previousButton')}
                onPress={this.onPreviousPressed}
                style={styles.button}
                enabled={this.state.activeRow > 0}
              />
              <Button
                title={i18n.t('screens.viewPrivateKey.nextButton')}
                onPress={this.onNextPressed}
                style={styles.button}
                enabled={this.state.activeRow < KEY_ROW_COUNT - 1}
              />
            </View>

          </PanelView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPrivateKeyScreen);

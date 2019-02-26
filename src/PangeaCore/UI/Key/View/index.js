// @flow

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import BackgroundImage from 'pangea-common-reactnative/UI/BackgroundImage';
import FakeNavigationBar from 'pangea-common-reactnative/UI/FakeNavigationBar';
import PanelView from 'pangea-common-reactnative/UI/PanelView';
import GridView from '../../components/GridView/index';
import Button from 'pangea-common-reactnative/UI/Button';
import PrivateKeyTextInputContainer from '../../components/PrivateKeyTextInputContainer/index';
import { KEY_COLUMN_COUNT, KEY_PAGE_ROW_COUNT, KEY_PAGE_LENGTH, KEY_ROW_COUNT } from 'pangea-common/Constants';
import BodyParagraphs from 'pangea-common-reactnative/UI/BodyParagraphs';
import i18n from 'pangea-common/i18n';
import type { State as KeyState } from '../../../reducers/key';
import NavigatorComponent from 'pangea-common-reactnative/UI/NavigatorComponent';
import type { Mnemonic } from 'pangea-common/types/Mnemonic-types';
import AccountsService from '../../../services/accounts';
import { errorAlert } from 'pangea-common/alerts';

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

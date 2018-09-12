// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import type { Navigator } from '../../../types/ReactNativeNavigation';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Button from '../../../components/common/Button';
import styles from './styles';
import i18n from '../../../global/i18n';
import {
  cancelDocumentModification,
  finishDocumentModification,
  updateModifiedDocumentField,
} from '../../../actions/documents';
import { type State as DocumentsState } from '../../../reducers/documents';
import Colors from '../../../global/colors';
import AssetsImages from '../../../global/AssetsImages';
import { imageSource } from '../../../utils/profile';
import { contentStorage } from '../../../services/documents';

type Props = {
  /**
   * @desc React Native Navigation navigator object.
   */
  navigator: Navigator,
};

type Actions = {
  /**
   * @desc Function to finish document modification.
   */
  finishDocumentModification: () => void,
  /**
   * @desc Function to cancel document modification.
   */
  cancelDocumentModification: () => void,
  /**
   * @desc Function to change field of modified document.
   * @param field Name of the field to be changed.
   * @param value New value of the field.
   */
  changeDocumentField: (field: string, value: any) => void,
}

class DocumentsModifyScreen extends NavigatorComponent<Props & DocumentsState & Actions> {
  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      leftButtons: [{
        id: 'cancel',
        icon: AssetsImages.closeIcon,
        title: i18n.t('common.cancel'),
        buttonColor: Colors.navigationButtonColor,
      }],
      rightButtons: [],
    });

    const { modification } = this.props;
    if (modification != null) {
      this.content = contentStorage.resolveContent(modification.new.dataId);
    }
  }

  content: string = '';

  onNavBarButtonPress(id: string) {
    switch (id) {
      case 'cancel':
        this.props.navigator.dismissModal();
        break;
      default:
        break;
    }
  }

  onFinishModification = () => {
    this.props.finishDocumentModification();
    this.props.navigator.dismissModal();
  };

  saveShouldBeEnabled = () => {
    const { modification } = this.props;
    if (modification == null) return false;
    if (modification.new.name.length === 0) return false;

    if (modification.initial === null) return true;
    if (modification.new.name !== modification.initial.name) return true;
    if (modification.new.description !== modification.initial.description) return true;

    return false;
  };

  render() {
    const { modification } = this.props;
    if (modification == null) return (<View />);

    return (
      <View style={styles.screenContainer}>
        <ScrollView contentContainerStyle={[styles.screenContainer, styles.noflex]}>
          <View style={styles.metadataContainer}>
            <View style={styles.labeledTextInputContainer}>
              <Text style={styles.textInputLabelText}>{i18n.t('screens.documentModify.fields.title')}</Text>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <TextInput
                  style={[styles.textInput, styles.bodyBlack]}
                  placeholder={i18n.t('screens.documentModify.placeholder.title')}
                  placeholderTextColor={Colors.placeholderTextColor}
                  keyboardType='default'
                  autoCapitalize='sentences'
                  autoCorrect
                  onChangeText={title => this.props.changeDocumentField('name', title)}
                  value={modification.new.name}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.labeledTextInputContainer}>
              <Text style={styles.textInputLabelText}>{i18n.t('screens.documentModify.fields.description')}</Text>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <TextInput
                  style={[styles.multilineTextInput]}
                  placeholder={i18n.t('screens.documentModify.placeholder.description')}
                  placeholderTextColor={Colors.placeholderTextColor}
                  keyboardType='default'
                  autoCapitalize='sentences'
                  autoCorrect
                  multiline
                  onChangeText={description => this.props.changeDocumentField('description', description)}
                  value={modification.new.description}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.previewContainer}>
            <Image
              source={imageSource(this.content, modification.new.mimeType)}
              style={styles.preview}
              resizeMode='contain'
            />
          </View>
        </ScrollView>
        <Button
          enabled={this.saveShouldBeEnabled()}
          style={styles.actionButton}
          title={i18n.t('screens.documentModify.save').toUpperCase()}
          onPress={this.onFinishModification}
          styleTitle={styles.actionButtonTitle}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.documents,
});

const mapDispatchToProps = dispatch => ({
  finishDocumentModification() {
    dispatch(finishDocumentModification());
  },
  cancelDocumentModification() {
    dispatch(cancelDocumentModification());
  },
  changeDocumentField(field, value) {
    dispatch(updateModifiedDocumentField(field, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsModifyScreen);

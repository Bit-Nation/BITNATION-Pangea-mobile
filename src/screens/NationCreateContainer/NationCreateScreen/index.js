// @flow

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';

import BackgroundImage from '../../../components/common/BackgroundImage';
import NavigatorComponent from '../../../components/common/NavigatorComponent';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import PanelView from '../../../components/common/PanelView';
import SwitchLabeled from '../../../components/common/SwitchLabeled';
import MultiSelect from '../../../components/MultiSelect';
import Loading from '../../../components/common/Loading';
import NationActionButton from '../../../components/common/NationActionButton';
import Colors from '../../../global/colors';
import styles from './styles';
import i18n from '../../../global/i18n';
import AssetsImage from '../../../global/AssetsImages';
import { nationIsModified, type State as ModifyNationState } from '../../../reducers/modifyNation';
import { nationIsValid } from '../../../utils/nations';
import type { EditingNationType, NationIdType } from '../../../types/Nation';

type Props = {
  navigator?: any,
}

type Actions = {
  onCancelNationCreation: () => void,
  onResetNationCreation: () => void,
  onSaveNationDraft: (EditingNationType, () => void) => void,
  onDeleteNationDraft: (NationIdType, () => void) => void,
  onSubmitNation: (EditingNationType, () => void) => void,
}

class CreateNation extends NavigatorComponent<Props & Actions & ModifyNationState> {
  static defaultProps: Object;
  constructor(props: Props) {
    super(props);

    this.actionSheet = null;
    this.multiGovernanceService = null;
    this.props.navigator.setButtons({
      leftButtons: [{
        title: i18n.t('screens.createNation.cancelButton'),
        id: 'cancel',
        buttonColor: Colors.navigationButtonColor,
      }],
      rightButtons: [],
    });
  }

  onNavBarButtonPress(id) {
    if (id === 'cancel') {
      this.props.onCancelNationCreation();
    }
  }

  setFieldValue(field: string, value: Object) {
    this.props.onNationChange(field, value);
  }

  render() {
    if (!this.props.editingNation) {
      return <View />;
    }

    return (
      <View style={styles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />

        <View style={styles.bodyContainer}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.noflex}>
            <View style={styles.titleContainer}>
              <View style={styles.titleBarLarge}>
                <Text style={styles.largeTitle}>
                  {i18n.t('screens.createNation.title')}
                </Text>
              </View>
            </View>
            {CreateNation.buildIntroPanel()}
            {this.buildCoreNationView()}
            {this.buildLocationNationView()}
            {this.buildGovernmentalView()}
            {this.buildOptionsView()}
          </ScrollView>
        </View>
        {this.buildBottomBar()}
        {this.props.inProgress ? <Loading /> : null}
      </View>
    );
  }

  static buildIntroPanel() {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.bodyParagraph}>
          <Text style={styles.body}>
            {i18n.t('screens.createNation.introduction')}
          </Text>
        </View>
      </View>
    );
  }

  buildBottomBar() {
    const isModified = nationIsModified(this.props);
    const isSavedDraft = this.props.initialNation.id !== undefined;
    const canSubmit = nationIsValid(this.props.editingNation);

    return (
      <View style={styles.fakeBottomBar}>
        <NationActionButton
          iconSource={AssetsImage.Actions.reset}
          title={i18n.t('screens.nations.toolbar.reset')}
          disable={!isModified}
          onPress={this.props.onResetNationCreation}
        />
        <NationActionButton
          iconSource={AssetsImage.Actions.save}
          title={i18n.t('screens.nations.toolbar.save')}
          disable={!isModified}
          onPress={this.props.onSaveNationDraft}
        />
        <NationActionButton
          iconSource={AssetsImage.Actions.delete}
          title={i18n.t('screens.nations.toolbar.delete')}
          disable={!isSavedDraft}
          onPress={this.props.onDeleteNationDraft}
        />
        <NationActionButton
          iconSource={AssetsImage.Actions.submit}
          title={i18n.t('screens.nations.toolbar.submit')}
          disable={!canSubmit}
          onPress={this.props.onSubmitNation}
        />
      </View>
    );
  }


  buildCoreNationView() {
    return (
      <PanelView
        style={styles.panelViewTransparent}
      >
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <View style={styles.formRow}>
              <TextInput
                style={styles.textInput}
                placeholder={i18n.t('screens.createNation.prompt.name')}
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
                onChangeText={text => this.setFieldValue('nationName', text)}
                value={this.props.editingNation.nationName}
              />
            </View>
            <View style={styles.formRow}>
              <TextInput
                style={styles.textInput}
                placeholder={i18n.t('screens.createNation.prompt.description')}
                multiline
                numberOfLines={4}
                placeholderTextColor={Colors.placeholderTextColor}
                keyboardType='default'
                onChangeText={text => this.setFieldValue('nationDescription', text)}
                value={this.props.editingNation.nationDescription}
              />
            </View>
          </View>
        </View>
      </PanelView>
    );
  }

  buildLocationNationView() {
    return (
      <PanelView
        style={styles.panelViewTransparent}
        title={i18n.t('common.location')}
        icon=' '
      >
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <MultiSelect
              single
              hideTags
              items={[{
                id: 'true',
                name: i18n.t('enums.nation.locationType.virtual'),
              }, {
                id: 'false',
                name: i18n.t('enums.nation.locationType.geographical'),
              }]}
              uniqueKey='id'
              onSelectedItemsChange={selectedItems => this.setFieldValue('virtualNation', selectedItems[0] === 'true')}
              selectedItems={
                this.props.editingNation.virtualNation === null
                  ? []
                  : [this.props.editingNation.virtualNation ? 'true' : 'false']
              }
              selectText={i18n.t('screens.createNation.prompt.location')}
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor='#CCC'
              tagBorderColor='#CCC'
              tagTextColor='#CCC'
              itemTextColor={Colors.textSecondary}
              displayKey='name'
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
          </View>
        </View>
        {
          this.props.editingNation.virtualNation === false &&
          <View style={styles.formRow}>
            <View style={styles.fieldsContainer}>
              <SwitchLabeled
                label={i18n.t('screens.createNation.prompt.represents')}
                value={this.props.editingNation.exists}
                onValueChange={value => this.setFieldValue('exists', value)}
              />
            </View>
          </View>
        }

        <Text style={styles.footnote}>
          {i18n.t('screens.createNation.locationTypeHint')}
        </Text>
      </PanelView>
    );
  }

  buildGovernmentalView() {
    return (
      <PanelView
        style={styles.panelViewTransparent}
        title={i18n.t('common.governmentalStructure')}
        icon=' '
      >
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <MultiSelect
              single
              hideTags
              items={[{
                id: i18n.t('enums.nation.legalCode.no'),
                name: i18n.t('enums.nation.legalCode.no'),
              }, {
                id: i18n.t('enums.nation.legalCode.transSupra'),
                name: i18n.t('enums.nation.legalCode.transSupra'),
              }, {
                id: i18n.t('enums.nation.legalCode.multiple'),
                name: i18n.t('enums.nation.legalCode.multiple'),
              }, {
                id: i18n.t('enums.nation.legalCode.unidroit'),
                name: i18n.t('enums.nation.legalCode.unidroit'),
              }, {
                id: i18n.t('enums.nation.legalCode.computer'),
                name: i18n.t('enums.nation.legalCode.computer'),
              }, {
                id: i18n.t('enums.nation.legalCode.common'),
                name: i18n.t('enums.nation.legalCode.common'),
              }, {
                id: i18n.t('enums.nation.legalCode.civil'),
                name: i18n.t('enums.nation.legalCode.civil'),
              }]}
              uniqueKey='id'
              onSelectedItemsChange={selectedItems => this.setFieldValue('nationCode', selectedItems[0])}
              selectedItems={[this.props.editingNation.nationCode]}
              selectText={i18n.t('screens.createNation.prompt.legalCode')}
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor='#CCC'
              tagBorderColor='#CCC'
              tagTextColor='#CCC'
              itemTextColor={Colors.textSecondary}
              displayKey='name'
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
          </View>
        </View>
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <MultiSelect
              single
              hideTags
              items={[{
                id: i18n.t('enums.nation.lawEnforcementMechanism.no'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.no'),
              }, {
                id: i18n.t('enums.nation.lawEnforcementMechanism.idReputation'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.idReputation'),
              }, {
                id: i18n.t('enums.nation.lawEnforcementMechanism.privateOrCooperativeSecurity'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.privateOrCooperativeSecurity'),
              }, {
                id: i18n.t('enums.nation.lawEnforcementMechanism.nationState'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.nationState'),
              }, {
                id: i18n.t('enums.nation.lawEnforcementMechanism.international'),
                name: i18n.t('enums.nation.lawEnforcementMechanism.international'),
              }]}
              uniqueKey='id'
              onSelectedItemsChange={selectedItems => this.setFieldValue('lawEnforcementMechanism', selectedItems[0])}
              selectedItems={[this.props.editingNation.lawEnforcementMechanism]}
              selectText={i18n.t('screens.createNation.prompt.lawEnforcementMechanism')}
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor='#CCC'
              tagBorderColor='#CCC'
              tagTextColor='#CCC'
              itemTextColor={Colors.textSecondary}
              displayKey='name'
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
          </View>
        </View>
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <MultiSelect
              single
              hideTags
              items={[{
                id: i18n.t('enums.nation.governmentType.other'),
                name: i18n.t('enums.nation.governmentType.other'),
              }, {
                id: i18n.t('enums.nation.governmentType.holocracy'),
                name: i18n.t('enums.nation.governmentType.holocracy'),
              }, {
                id: i18n.t('enums.nation.governmentType.democracy'),
                name: i18n.t('enums.nation.governmentType.democracy'),
              }, {
                id: i18n.t('enums.nation.governmentType.autocracy'),
                name: i18n.t('enums.nation.governmentType.autocracy'),
              }, {
                id: i18n.t('enums.nation.governmentType.meritocracy'),
                name: i18n.t('enums.nation.governmentType.meritocracy'),
              }, {
                id: i18n.t('enums.nation.governmentType.theocracy'),
                name: i18n.t('enums.nation.governmentType.theocracy'),
              }]}
              uniqueKey='id'
              onSelectedItemsChange={selectedItems => this.setFieldValue('decisionMakingProcess', selectedItems[0])}
              selectedItems={[this.props.editingNation.decisionMakingProcess]}
              selectText={i18n.t('screens.createNation.prompt.typeOfGovernment')}
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor='#CCC'
              tagBorderColor='#CCC'
              tagTextColor='#CCC'
              itemTextColor={Colors.textSecondary}
              displayKey='name'
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
          </View>
        </View>
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <MultiSelect
              hideTags
              items={[{
                id: i18n.t('enums.nation.services.legal'),
                name: i18n.t('enums.nation.services.legal'),
              }, {
                id: i18n.t('enums.nation.services.insurance'),
                name: i18n.t('enums.nation.services.insurance'),
              }, {
                id: i18n.t('enums.nation.services.social'),
                name: i18n.t('enums.nation.services.social'),
              }, {
                id: i18n.t('enums.nation.services.diplomatic'),
                name: i18n.t('enums.nation.services.diplomatic'),
              }, {
                id: i18n.t('enums.nation.services.physical'),
                name: i18n.t('enums.nation.services.physical'),
              }]}
              uniqueKey='id'
              ref={(component) => { this.multiGovernanceService = component; }}
              onSelectedItemsChange={selectedItems => this.setFieldValue('governanceService', selectedItems)}
              selectedItems={this.props.editingNation.governanceService}
              selectText={i18n.t('screens.createNation.prompt.servicesOffered')}
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor='#CCC'
              tagBorderColor='#CCC'
              tagTextColor='#CCC'
              itemTextColor={Colors.textSecondary}
              displayKey='name'
              submitButtonColor={Colors.panelBoxColor}
              submitButtonText={i18n.t('common.ok')}
            />
            <View>
              {
                this.multiGovernanceService
                &&
                this.multiGovernanceService
                  .getSelectedItemsExt(this.props.editingNation.governanceService)}
            </View>
          </View>
        </View>
      </PanelView>
    );
  }

  buildOptionsView() {
    return (
      <PanelView
        style={styles.panelViewTransparent}
        title={i18n.t('common.options')}
        icon=' '
      >
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <SwitchLabeled
              label={i18n.t('screens.createNation.prompt.diplomaticRecognition')}
              value={this.props.editingNation.diplomaticRecognition}
              onValueChange={value => this.setFieldValue('diplomaticRecognition', value)}
            />
          </View>
        </View>
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <SwitchLabeled
              label={i18n.t('screens.createNation.prompt.servicesUsage')}
              value={this.props.editingNation.nonCitizenUse}
              onValueChange={value => this.setFieldValue('nonCitizenUse', value)}
            />
          </View>
        </View>
        <View style={styles.formRow}>
          <View style={styles.fieldsContainer}>
            <SwitchLabeled
              label={i18n.t('screens.createNation.prompt.profit')}
              value={this.props.editingNation.profit}
              onValueChange={value => this.setFieldValue('profit', value)}
            />
          </View>
        </View>
      </PanelView>
    );
  }
}

CreateNation.defaultProps = {
  navigator: null,
  onCancelNationCreation: () => null,
  onResetNationCreation: () => null,
  onSaveNationDraft: () => null,
  onDeleteNationDraft: () => null,
  onSubmitNation: () => null,
};

export default CreateNation;

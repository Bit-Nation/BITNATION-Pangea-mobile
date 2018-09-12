// @flow

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  InteractionManager,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import i18n from '../../global/i18n';
import BackgroundImage from '../../components/common/BackgroundImage';
import styles from './styles';
import ScreenTitle from '../../components/common/ScreenTitle';
import { migrateDuplicateAccounts, restartPanthalassaWithAccount } from '../../actions/accounts';
import { startMigration } from '../../actions/migration';
import type { AccountType as DBAccount } from '../../services/database/schemata';
import FakeNavigationBar from '../../components/common/FakeNavigationBar';
import NavigatorComponent from '../../components/common/NavigatorComponent';
import DuplicateAccountsModal from './DuplicateAccountsModal/index';
import Colors from '../../global/colors';
import { alert } from '../../global/alerts';

type Actions = {
  /**
   * @desc Function to initiate migration
   */
  startMigration: () => void,
  /**
   * @desc Function to initiate migration
   * @param {Array<DBAccount>} accounts List accounts delete
   * @param {function} callback Callback that is called with true if check is successful and false otherwise.
   */
  migrateDuplicateAccounts: (accounts: Array<DBAccount>, callback: (success: boolean) => void) => void,
  /**
   * @desc Action to perform a restart panthalassa.
   */
  restartPanthalassaWithAccount: (accountId: string, callback: (success: boolean) => void) => void,
};

type Props = {
  /**
   * @desc List account duplicate
   */
  accountsMigration: Array<DBAccount>,
  /**
   * @desc Callback to be called when user done mnemonic entering.
   * @param {string | null} accountId Account id which need to be restore
   */
  onDoneEntering: (accountId?: string) => void,
};

type State = {
  /**
   * @desc Flag of the modal to be shown
   */
  showModal: boolean,
  /**
   * @desc Index account choice
   */
  selectedAccountIndex: number,
};

class MigrationScreen extends NavigatorComponent<Actions & Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedAccountIndex: -1,
    };
  }

  componentWillMount() {
    this.props.startMigration();
    InteractionManager.runAfterInteractions(() => {
      if (this.props.accountsMigration !== undefined) {
        this.setState({
          showModal: true,
        });
      }
    });
  }

  showFailToDeleteDuplicateAccounts = () => {
    alert('deleteDuplicateAccountsFail', [
      {
        name: 'confirm',
        onPress: async () => {
          this.setState({
            showModal: true,
          });
        },
      }]);
  }

  onDismiss = () => {
    const accounts = [];
    this.props.accountsMigration.forEach((account, index) => {
      if (index !== this.state.selectedAccountIndex) accounts.push(account);
    });
    const { id } = this.props.accountsMigration[this.state.selectedAccountIndex];
    this.props.migrateDuplicateAccounts(accounts, (success) => {
      if (success) {
        this.props.restartPanthalassaWithAccount(id, (done) => {
          if (done) {
            this.props.onDoneEntering(id);
          } else {
            this.showFailToDeleteDuplicateAccounts();
          }
        });
      } else {
        this.showFailToDeleteDuplicateAccounts();
      }
    });
  }

  dismissModal = () => {
    this.setState({
      showModal: false,
    });
    if (Platform.OS === 'android') {
      this.onDismiss();
    }
  };

  onSelectAccount = (index) => {
    this.setState({
      selectedAccountIndex: index,
    });
  }

  render() {
    return (
      <View style={styles.migrationContainer}>
        <DuplicateAccountsModal
          done={this.dismissModal}
          visible={this.state.showModal}
          selectedAccountIndex={this.state.selectedAccountIndex}
          accountsMigration={this.props.accountsMigration}
          onSelectAccount={this.onSelectAccount}
          onDismiss={this.onDismiss}
        />
        <BackgroundImage />
        <FakeNavigationBar />
        <ScreenTitle title={i18n.t('screens.migration.title')} />
        <View style={styles.bodyContainer}>
          <ActivityIndicator size='small' color={Colors.textPrimary} />
          <Text style={[styles.subhead, styles.migrationText]}>{i18n.t('screens.migration.migrateData')}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.migration,
});

const mapDispatchToProps = dispatch => ({
  startMigration: () => dispatch(startMigration()),
  migrateDuplicateAccounts: (accounts, callback) => dispatch(migrateDuplicateAccounts(accounts, callback)),
  restartPanthalassaWithAccount: (accountId, callback) => dispatch(restartPanthalassaWithAccount(accountId, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MigrationScreen);

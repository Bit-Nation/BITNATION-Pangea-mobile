// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/colors';
import GlobalStyles from '../../../global/Styles';
import i18n from '../../../global/i18n';
import { DAppProvider } from '../../../components/nativeDApps/DAppProvider';
import type { WalletType } from '../../../types/Wallet';
import View from '../../../components/dApps/View';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import { sendDAppMessage } from '../../../actions/dApps';
import { getCurrentAccount } from '../../../reducers/accounts';
import { getSelectedSession } from '../../../utils/chat';
import type { ChatSessionType, DAppMessageType, GiftedChatMessageType } from '../../../types/Chat';
import type { Account } from '../../../types/Account';

type OwnProps = {
  /**
   * @desc JSON object of layout to be displayed.
   */
  component: React.ComponentType<any>,
  /**
   * @desc Public key of DApp that controls the screen.
   */
  dAppPublicKey: string,
  /**
   * @desc Shared secret for the chat session
   */
  chatSecret: string,
}

type Props = {
  /**
   * @desc List of wallets.
   */
  wallets: Array<WalletType>,
  /**
   * @desc List of chat.
   */
  sessions: Array<ChatSessionType>,
  /**
   * @desc Function to send a DApp message.
   */
  sendMessage: (message: DAppMessageType, session: ChatSessionType, callback: (message: ?GiftedChatMessageType) => void) => void,
  /**
   * @desc Current user.
   */
  user: Account
}

class DAppModalScreen extends NavigatorComponent<Props & OwnProps> {
  constructor(props) {
    super(props);

    this.InjectedModal = DAppProvider(this.props.component);
  }

  InjectedModal;

  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: i18n.t('common.cancel'),
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
  };

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.navigator.dismissModal();
    }
  }

  render() {
    const { InjectedModal } = this;

    const session = getSelectedSession(this.props.sessions, this.props.chatSecret);

    if (session == null) {
      this.props.navigator.dismissModal();
      return null;
    }

    return (
      <View style={GlobalStyles.screenContainer}>
        <BackgroundImage />
        <FakeNavigationBar />
        <View style={GlobalStyles.bodyContainer}>
          <InjectedModal
            {...this.props}
            session={session}
            currentAccount={this.props.user}
            friend={{
              _id: session.publicKey,
              name: session.username,
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  wallets: state.wallet.wallets,
  sessions: state.chat.chats,
  user: getCurrentAccount(state.accounts),
});

const mapDispatchToProps = dispatch => ({
  sendMessage(message, session, callback) {
    dispatch(sendDAppMessage(message, session, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DAppModalScreen);

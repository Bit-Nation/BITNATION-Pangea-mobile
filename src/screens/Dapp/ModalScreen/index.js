// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import NavigatorComponent from '../../../components/common/NavigatorComponent';
import Colors from '../../../global/colors';
import GlobalStyles from '../../../global/Styles';
import i18n from '../../../global/i18n';
import type { WalletType } from '../../../types/Wallet';
import FakeNavigationBar from '../../../components/common/FakeNavigationBar';
import BackgroundImage from '../../../components/common/BackgroundImage';
import { sendDAppMessage } from '../../../actions/nativeDApps';
import { getCurrentAccount } from '../../../reducers/accounts';
import { getSelectedSession } from '../../../utils/chat';
import type { ChatSessionType, DAppMessageType, GiftedChatMessageType, ProfileType } from '../../../types/Chat';
import type { Account } from '../../../types/Account';
import Loading from '../../../components/common/Loading';

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
  /**
   * @desc Shared secret for the chat session
   */
  friend: ProfileType,
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

type State = {
  isLoading: boolean,
}

class DAppModalScreen extends NavigatorComponent<Props & OwnProps, State> {
  static navigatorButtons = {
    leftButtons: [{
      id: 'cancel',
      title: i18n.t('common.cancel'),
      buttonColor: Colors.navigationButtonColor,
    }],
    rightButtons: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  onNavBarButtonPress(id: string) {
    if (id === 'cancel') {
      this.props.navigator.dismissModal();
    }
  }

  render() {
    const { component: Component } = this.props;

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
          <Component
            {...this.props}
            setLoadingVisible={visible => this.setState({ isLoading: visible })}
            session={session}
            currentAccount={this.props.user}
          />
        </View>
        {this.state.isLoading && <Loading />}
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

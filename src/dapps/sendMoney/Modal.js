import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import type { ProvidedProps } from '../../components/nativeDApps/DAppProvider';
import Button from '../../components/common/Button';
import i18n from '../../global/i18n';
import Colors from '../../global/colors';
import GlobalStyles from '../../global/Styles';
import { errorAlert } from '../../global/alerts';
import type { ProfileType } from '../../types/Chat';

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  textInputInContainer: {
    ...GlobalStyles.textInput,
    marginBottom: 0,
    marginTop: 0,
    borderBottomWidth: 0,
  },
  currencyNumber: {
    fontWeight: 'normal',
    color: Colors.BitnationDarkGrayColor,
  },
  toLabelText: {
    ...GlobalStyles.footnote,
    marginLeft: 5,
    marginTop: 10,
  },
  sendButton: {
    backgroundColor: Colors.BitnationHighlightColor,
    height: 50,
    borderRadius: 0,
    marginTop: 16,
  },
});

export type SendMoneyMessageData = {
  amount: string,
  currency: string,
  fromAddress: string,
  txHash: string,
  to: ProfileType,
}

export default class Modal extends React.Component<ProvidedProps, *> {
  constructor(props: ProvidedProps) {
    super(props);

    this.state = {
      amount: '',
      currency: '',
      fromAddress: '',
      isValid: false,
    };
  }

  onAmountSelected = (amount: string, currency: string, fromAddress: string, isValid: boolean) => {
    this.setState({
      amount, currency, fromAddress, isValid,
    });
  };

  onButtonPress = async () => {
    // @todo Get wallet address from ethereum_pub_Key
    try {
      const result = await this.props.services.ethereumService.sendMoney('0x560d7433407ee0F862348a44D43E07749077C011', this.state.amount);

      const data: SendMoneyMessageData = {
        amount: this.state.amount,
        currency: this.state.currency,
        fromAddress: this.state.fromAddress,
        txHash: result.hash,
        to: this.props.context.friend,
      };

      this.props.services.sendMessage('SEND_MESSAGE', '', data, () => {
        this.props.navigation.dismiss();
      });
    } catch (error) {
      errorAlert(error);
    }
  };

  render() {
    return (
      <View>
        {this.props.components.renderAmountSelect({
          onAmountSelected: this.onAmountSelected,
          shouldCheckLess: true,
        })}
        <Text style={styles.toLabelText}>{i18n.t('common.to')}</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={[styles.textInputInContainer, GlobalStyles.currencyLarge, styles.currencyNumber]}
            editable={false}
            value={this.props.context.friend.name}
          />
        </View>
        <Button
          styleTitle={GlobalStyles.title3}
          style={styles.sendButton}
          title={i18n.t('common.send')}
          onPress={this.onButtonPress}
          enabled={this.state.isValid}
        />
      </View>
    );
  }
}

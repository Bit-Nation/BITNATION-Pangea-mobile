import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import type { ProvidedProps } from '../../components/nativeDApps/DAppProvider';
import Button from '../../components/common/Button';
import i18n from '../../global/i18n';
import Colors from '../../global/colors';
import GlobalStyles from '../../global/Styles';

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
export default class Modal extends React.Component<ProvidedProps, *> {
  constructor(props: ProvidedProps) {
    super(props);

    this.state = {
      amount: '',
      currency: '',
      address: '',
      isValid: false,
    };
  }

  onAmountSelected = (amount: string, currency: string, address: string, isValid: boolean) => {
    this.setState({
      amount, currency, address, isValid,
    });
  };

  onButtonPress = () => {
    this.props.services.sendMessage('TEST_TYPE', '', { data: { ...this.state, to: this.props.context.friend.name } }, () => {
    });
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

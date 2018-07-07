// @flow

/* eslint-disable prefer-destructuring,class-methods-use-this */
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import type { ProvidedProps as MessageProvidedProps } from '../../components/nativeDApps/MessageProvider';
import ContractInteractionMessage from './ContractInteractionMessage';
import { MessageParamsValidator } from '../../components/nativeDApps/MessageParamsValidator';
import type { MessageData } from './Constants';
import ContractInfo from './ERC20TokenEscrow.json';

const styles = StyleSheet.create({
  container: { margin: 10 },
  textBold: { fontWeight: 'bold' },
});

type OwnProps = {
  data: MessageData,
}

type State = {
  contract: Object | null,
  contractAddress: string | null,
  contractCheckFailed: boolean,
}

type Props = MessageProvidedProps & OwnProps;

class Message extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      contract: null,
      contractAddress: null,
      contractCheckFailed: false,
    };

    this.getContractAddress().catch(() => {
      this.setState({ contractCheckFailed: true });
    });
  }

  getContractAddress = async () => {
    await this.props.services.ethereumService.trackTransaction(this.props.data.deployTxHash);
    const receipt = await this.props.services.ethereumService.getTransactionReceipt(this.props.data.deployTxHash);
    this.setState({
      contractAddress: receipt.contractAddress,
      contract: this.props.services.getContract(receipt.contractAddress, ContractInfo.abi),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.contractAddress == null || this.state.contract === null ?
            (
              <Text style={styles.textBold}>
                {
                  this.state.contractCheckFailed
                    ? 'Failed to check status, please reopen the chat'
                    : 'Checking smart contract status'
                }
              </Text>
            )
            :
            (
              <ContractInteractionMessage
                contract={this.state.contract}
                contractAddress={this.state.contractAddress}
                {...this.props}
                {...this.props.data}
              />
            )
        }
      </View>
    );
  }
}

export default MessageParamsValidator(Message, (data: Object) =>
  data.deployTxHash != null
  && data.etherAmount != null
  && data.tokenAmount != null
  && data.tokenContractAddress != null
  && data.tokensFromAddress != null
  && data.tokensFromName != null);

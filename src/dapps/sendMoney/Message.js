import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../global/colors';
import type { ProvidedProps as MessageProvidedProp } from '../../components/nativeDApps/MessageProvider';

const styles = StyleSheet.create({
  container: { margin: 5 },
  text: {
    fontSize: 17,
    color: Colors.BitnationDarkGrayColor,
  },
  textBold: {
    fontWeight: 'bold',
  },

});
const MessageView = ({ context: { dAppMessage: { params = '' } } }:MessageProvidedProp) => {
  const { data = {} } = JSON.parse(params);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
      Send <Text style={styles.textBold}>{`${data.amount} ${data.currency}`} </Text>to {data.to}
      </Text>
    </View>
  );
};
export default MessageView;

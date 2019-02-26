// @flow

import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../styles';
import i18n from 'pangea-common/i18n';


type Props = {
  /**
   * @desc Status message to show in panel
   */
  status?: string,
};

/**
 * @desc Component that renders an alert panel view for Nations Status
 * @return {React.Component} A component.
 */

const PanelViewAlert = ({ status }: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <View style={styles.panelViewAlert}>
      <Text style={styles.panelAlertBold}>
        {i18n.t('screens.nationDetails.status')}
      </Text>
      <Text style={styles.panelAlertStatus}>
        {status}
      </Text>
    </View>
  );
};

PanelViewAlert.defaultProps = {
  status: '',
};

export default PanelViewAlert;

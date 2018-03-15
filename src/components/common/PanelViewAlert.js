/**
 * @desc Component that renders an alert panel view for Nations Status
 * @type React.Component
 * @param props.status {String} Name of the Nation of citizenship
 */

import React from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';
import GlobalStyles from '../../global/Styles';
import i18n from '../../global/i18n';

const PanelViewAlert = ({ status }) => {
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

PanelViewAlert.propTypes = {
  /**
   * @desc Statue message to show in panel
   * @type string
   */
  status: PropTypes.string,
};

PanelViewAlert.defaultProps = {
  status: '',
};

export default PanelViewAlert;

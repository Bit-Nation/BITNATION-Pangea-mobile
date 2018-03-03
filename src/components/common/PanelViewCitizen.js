/**
 * @desc Component that renders the panel indicating the user is Citizen of a Nation
 * @type React.Component
 * @param props.nationName {String} Name of the Nation of citizenship
 */

import React from 'react';
import { View, Text, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';
import GlobalStyles from '../../global/Styles';
import i18n from '../../global/i18n';
import AssetsImages from '../../global/AssetsImages';

/**
 * @desc Component that renders the panel indicating the user is Citizen of a Nation
 * @type React.Component
 */

const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

const PanelViewCitizen = ({ nationName }) => (
  <View style={styles.panelViewCitizen}>
    <Text style={styles.body}>
      {i18n.t('screens.nationDetails.citizen')} {nationName}
    </Text>
    <Image source={AssetsImages.userCitizenIcon} style={styles.panelViewCitizenIcon} />
  </View>
);

PanelViewCitizen.propTypes = {
  /**
   * @desc Name of the Nation
   * @type string
   */
  nationName: PropTypes.string,
};

PanelViewCitizen.defaultProps = {
  nationName: '',
};

export default PanelViewCitizen;

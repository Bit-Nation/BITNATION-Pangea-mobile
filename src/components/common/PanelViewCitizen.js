import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';
import _ from 'lodash';

import GlobalStyles from '../../global/Styles';
import i18n from '../../global/i18n';
import AssetsImages from '../../global/AssetsImages';

/**
 * @desc Component that renders the panel indicating the user is Citizen of a Nation
 * @type React.Component
 */
export default class PanelViewCitizen extends Component {
  render() {
    const { style } = this.props;

    return (
      <View style={style}>
        <Text style={styles.body}>
          {`${i18n.t('screens.nationDetails.citizen')} ${this.props.nationName}`}
        </Text>
        <Image source={AssetsImages.userCitizenIcon} style={styles.panelViewCitizenIcon} />
      </View>
    );
  }
}


const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

PanelViewCitizen.defaultProps = {
  style: styles.panelViewCitizen,
};

PanelViewCitizen.PropTypes = {
  /**
   * @desc Name of the Nation
   * @type string
   */
  nationName: PropTypes.string,
};

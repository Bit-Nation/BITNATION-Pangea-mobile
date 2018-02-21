import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import PropTypes from 'prop-types';
import _ from 'lodash';

import GlobalStyles from '../../global/Styles';
import i18n from '../../global/i18n';

/**
 * @desc Component that renders an alert panel view for Nations Status
 * @type React.Component
 */
export default class PanelViewAlert extends Component {
  render() {
    const { style } = this.props;

    return (
      <View style={style}>
        <Text style={styles.panelAlertBold}>
          {i18n.t('screens.nationDetails.status')}
        </Text>
        <Text style={styles.panelAlertStatus}>
          {` ${this.props.status}`}
        </Text>
      </View>
    );
  }
}


const styles = MediaQueryStyleSheet.create({
  ...GlobalStyles,
});

PanelViewAlert.defaultProps = {
  style: styles.panelViewAlert,
};

PanelViewAlert.PropTypes = {
  /**
   * @desc Title of panel
   * @type string
   */
  status: PropTypes.string,
};

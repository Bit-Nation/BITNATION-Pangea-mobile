/**
 * @desc Component that renders the panel indicating the user is Citizen of a Nation
 * @type React.Component
 * @param props.title {String} Title of the Button
 * @param props.iconSource {String} Image to render in the button
 * @param props.disable {boolean} Boolean to enable/disable the button
 */

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';

const NationActionButton = ({
  title, disable, iconSource, onPress,
}) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
  });

  return (
    <View style={styles.tabBarButton} opacity={disable ? 0.4 : 1}>
      <TouchableOpacity
        style={[styles.tabBarContainer]}
        onPress={onPress}
        disabled={disable}
        activeOpacity={disable ? 1 : 0.4}
      >
        <Image source={iconSource} />
        <Text style={styles.tabBarTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

NationActionButton.propTypes = {
  /**
   * @desc Value to enable/disable the button.
   * @type boolean
   */
  disable: PropTypes.bool,
  /**
   * @desc Text label of the button.
   * @type string
   */
  title: PropTypes.string,
  /**
   * @desc Callback to be called when button is pressed.
   * @type func
   */
  onPress: PropTypes.func,
  /**
   * @desc Callback to be called on Switch when changes value.
   * @type number
   */
  iconSource: PropTypes.number,
};

NationActionButton.defaultProps = {
  disable: true,
  title: '',
  iconSource: '',
  onPress: () => null,
};

export default NationActionButton;

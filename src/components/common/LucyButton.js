// @flow

import * as React from 'react';
import { Image } from 'react-native';
import { Fab } from 'native-base';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import GlobalStyles from '../../global/Styles';
import AssetsImages from '../../global/AssetsImages';

type Props = {
  /**
   * @desc Callback to be called on button press.
   */
  onPress?: () => any,
}

/**
 * @desc Component that renders common button.
 * @return {React.Component} A component.
 */
const LucyButton = ({
  onPress,
}: Props) => {
  const styles = MediaQueryStyleSheet.create({
    ...GlobalStyles,
    lucyButtonImage: {
      width: 50,
      height: 50,
    },
  });

  return ((
    <Fab
      style={styles.lucyButton}
      position='bottomRight'
      onPress={onPress}
    >
      <Image source={AssetsImages.lucyIcon} />
    </Fab>
  ));
};

LucyButton.defaultProps = {
  onPress: undefined,
};

export default LucyButton;

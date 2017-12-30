import React from 'react';
import { Image } from 'react-native';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import AssetsImages from '../../global/AssetsImages';

export default class BackgroundImage extends React.Component {

  render() {
    return (
      <Image style={[styles.background, this.props.style]}
             source={this.props.source || AssetsImages.background}
             {...this.props} />
    );
  }

}

const styles = MediaQueryStyleSheet.create({
  background: {
    position: 'absolute',
    marginLeft: 0,
    marginBottom: 0,
    marginRight: 0,
    marginTop: 0,
  }
});
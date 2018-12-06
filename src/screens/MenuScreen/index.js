import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import AssetsImages from '../../global/AssetsImages';
import Colors from '../../global/colors';

import NavigatorComponent from '../../components/common/NavigatorComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  avatarView: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BitnationDarkGrayColor,
  },
  avatarLarge: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  navigateButtonView: {
    flex: 0.7,
    alignItems: 'center',
  },
  navigateButtonStyle: {
    paddingVertical: 10,
  },
  navigateTextStyle: {
    fontFamily: 'Roboto',
    fontSize: 25,
    color: Colors.textPrimary,
  },
});

class MyClass extends NavigatorComponent {
  constructor(props) {
    super(props);
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
  }

  toggleDrawer = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarView}>
          <Image source={AssetsImages.avatarIcon} style={styles.avatarLarge} />
        </View>
        <View style={styles.navigateButtonView}>
          <TouchableOpacity style={styles.navigateButtonStyle}>
            <Text style={styles.navigateTextStyle}>Update My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigateButtonStyle}>
            <Text style={styles.navigateTextStyle}>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigateButtonStyle}>
            <Text style={styles.navigateTextStyle}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigateButtonStyle}>
            <Text style={styles.navigateTextStyle}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MyClass;

import * as React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import styles from "./styles";

type Props = {
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  onLeftFunc?: () => void,
  onRightFunc?: () => void
};

const leftIconDefault = () => (
  <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>JB</Text>
);


const rightIconDefault = () => {
  return <Image source={images.GROUP_ICON} />;
};

class Header extends React.Component<Props, {}> {
  static defaultProps = {
    leftIcon: null,
    rightIcon: null
  };

  _renderLeftIcon() {
    const { leftIcon, onLeftFunc } = this.props;
    if (leftIcon) {
      return (
        <TouchableOpacity style={styles.leftIconStyle} onPress={onLeftFunc}>
          {leftIcon}
        </TouchableOpacity>
      );
    }
    return null;
  }

  _renderRightIcon() {
    const { rightIcon, onRightFunc } = this.props;
    if (rightIcon) {
      return (
        <TouchableOpacity style={styles.rightIconStyle} onPress={onRightFunc}>
          {rightIcon}
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={{
          backgroundColor: "transparent",
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center"
        }}
      />
    );
  }

  _renderTitle() {
    const props = this.props;
    if (!props.title) {
      return <View style={styles.logoWrapper} />;
    }
    if (typeof props.title === "string") {
      return <Text style={styles.titleText}>{props.title}</Text>;
    }
    return <View>{props.title}</View>;
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View>{this._renderLeftIcon()}</View>
        <View>{this._renderTitle()}</View>
        <View>{this._renderRightIcon()}</View>
      </View>
    );
  }
}

export default Header;

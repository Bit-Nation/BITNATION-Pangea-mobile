import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ViewPropTypes,
} from 'react-native';
import Button from './Button';

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

class DefaultTabBar extends React.Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabContainerStyle: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    activeTextColor: 'navy',
    inactiveTextColor: 'black',
    backgroundColor: null,
  };

  constructor(props) {
    super(props);
    this.renderTab = this.renderTab.bind(this);
  }

  renderTabOption(name, page) {
  }

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <Button
        style={{ flex: 1 }}
        key={name}
        accessible
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {name}
          </Text>
        </View>
      </Button>);
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View style={[styles.tabs, { backgroundColor: this.props.backgroundColor }, this.props.tabContainerStyle]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [
                { translateX },
              ],
            },
            this.props.underlineStyle,
          ]}
        />
      </View>
    );
  }
}

export default DefaultTabBar;

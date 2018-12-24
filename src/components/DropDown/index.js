/* eslint-disable */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  FlatList,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  ViewPropTypes,
  I18nManager,
} from 'react-native';
import Ripple from './components/ripple';
import DropdownItem from './components/dropDownItem';
import BaseComponent from './components/baseComponent';
import styles from './styles';

export default class Dropdown extends PureComponent {
  static defaultProps = {
    hitSlop: {
      top: 6, right: 4, bottom: 6, left: 4,
    },

    disabled: false,

    data: [],

    valueExtractor: ({ value } = {}, index) => value,
    labelExtractor: ({ label } = {}, index) => label,
    propsExtractor: () => null,

    absoluteRTLLayout: false,

    dropdownOffset: {
      top: 32,
      left: 0,
    },

    dropdownMargins: {
      min: 8,
      max: 16,
    },

    rippleCentered: false,
    rippleSequential: true,

    rippleInsets: {
      top: 16,
      right: 0,
      bottom: -8,
      left: 0,
    },

    rippleOpacity: 0.54,
    shadeOpacity: 0.12,

    rippleDuration: 400,
    animationDuration: 225,

    fontSize: 16,

    textColor: 'rgba(0, 0, 0, .87)',
    itemColor: 'rgba(0, 0, 0, .54)',
    baseColor: 'rgba(0, 0, 0, .38)',

    itemCount: 4,
    itemPadding: 8,

    supportedOrientations: [
      'portrait',
      'portrait-upside-down',
      'landscape',
      'landscape-left',
      'landscape-right',
    ],

    useNativeDriver: false,
  };

  static propTypes = {
    ...TouchableWithoutFeedback.propTypes,

    disabled: PropTypes.bool,

    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    data: PropTypes.arrayOf(PropTypes.object),

    valueExtractor: PropTypes.func,
    labelExtractor: PropTypes.func,
    propsExtractor: PropTypes.func,

    absoluteRTLLayout: PropTypes.bool,

    dropdownOffset: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }),

    dropdownMargins: PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    }),

    dropdownPosition: PropTypes.number,

    rippleColor: PropTypes.string,
    rippleCentered: PropTypes.bool,
    rippleSequential: PropTypes.bool,

    rippleInsets: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
    }),

    rippleOpacity: PropTypes.number,
    shadeOpacity: PropTypes.number,

    rippleDuration: PropTypes.number,
    animationDuration: PropTypes.number,

    fontSize: PropTypes.number,

    textColor: PropTypes.string,
    itemColor: PropTypes.string,
    selectedItemColor: PropTypes.string,
    disabledItemColor: PropTypes.string,
    baseColor: PropTypes.string,

    itemTextStyle: Text.propTypes.style,

    itemCount: PropTypes.number,
    itemPadding: PropTypes.number,

    onLayout: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func,

    renderBase: PropTypes.func,
    renderAccessory: PropTypes.func,

    containerStyle: (ViewPropTypes || View.propTypes).style,
    overlayStyle: (ViewPropTypes || View.propTypes).style,
    pickerStyle: (ViewPropTypes || View.propTypes).style,

    supportedOrientations: PropTypes.arrayOf(PropTypes.string),

    useNativeDriver: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onLayout = this.onLayout.bind(this);

    this.updateRippleRef = this.updateRef.bind(this, 'ripple');
    this.updateContainerRef = this.updateRef.bind(this, 'container');
    this.updateScrollRef = this.updateRef.bind(this, 'scroll');

    this.renderAccessory = this.renderAccessory.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.keyExtractor = this.keyExtractor.bind(this);

    this.blur = () => this.onClose();
    this.focus = this.onPress;

    const { value } = this.props;

    this.mounted = false;
    this.focused = false;

    this.state = {
      opacity: new Animated.Value(0),
      selected: -1,
      indexSelected: -1,
      modal: false,
      value,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.setState({ value });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onPress(event) {
    const {
      data,
      disabled,
      onFocus,
      itemPadding,
      rippleDuration,
      dropdownOffset,
      dropdownMargins: { min: minMargin, max: maxMargin },
      animationDuration,
      absoluteRTLLayout,
      useNativeDriver,
    } = this.props;

    if (disabled) {
      return;
    }

    const itemCount = data.length;
    const timestamp = Date.now();

    if (event != null) {
      /* Adjust event location */
      event.nativeEvent.locationY -= this.rippleInsets().top;
      event.nativeEvent.locationX -= this.rippleInsets().left;

      /* Start ripple directly from event */
      this.ripple.startRipple(event);
    }

    if (!itemCount) {
      return;
    }

    this.focused = true;

    if (typeof onFocus === 'function') {
      onFocus();
    }

    const dimensions = Dimensions.get('window');

    this.container.measureInWindow((x, y, containerWidth, containerHeight) => {
      const { opacity } = this.state;

      /* Adjust coordinates for relative layout in RTL locale */
      if (I18nManager.isRTL && !absoluteRTLLayout) {
        x = dimensions.width - (x + containerWidth);
      }

      const delay = Math.max(0, rippleDuration - animationDuration - (Date.now() - timestamp));
      const selected = this.selectedIndex();

      let leftInset;
      let left = x
        + dropdownOffset.left
        - maxMargin;

      if (left > minMargin) {
        leftInset = maxMargin;
      } else {
        left = minMargin;
        leftInset = minMargin;
      }

      let right = x + containerWidth + maxMargin;
      let rightInset;

      if (dimensions.width - right > minMargin) {
        rightInset = maxMargin;
      } else {
        right = dimensions.width - minMargin;
        rightInset = minMargin;
      }

      const top = y + dropdownOffset.top - itemPadding;

      this.setState({
        modal: true,
        width: right - left,
        top,
        left,
        leftInset,
        rightInset,
        selected,
      });

      setTimeout((() => {
        if (this.mounted) {
          this.resetScrollOffset();

          Animated
            .timing(opacity, {
              duration: animationDuration,
              toValue: 1,
              useNativeDriver,
            })
            .start(() => {
              if (this.mounted && Platform.OS === 'ios') {
                const { flashScrollIndicators } = this.scroll || {};

                if (typeof flashScrollIndicators === 'function') {
                  flashScrollIndicators.call(this.scroll);
                }
              }
            });
        }
      }), delay);
    });
  }

  onClose(indexSelected = this.state.indexSelected) {
    const { animationDuration, useNativeDriver } = this.props;
    const { opacity } = this.state;

    Animated
      .timing(opacity, {
        duration: animationDuration,
        toValue: 0,
        useNativeDriver,
      })
      .start(() => {
        this.focused = false;
        if (this.mounted) {
          this.setState({ indexSelected, modal: false });
        }
      });
  }

  onSelect(index) {
    const {
      animationDuration,
      rippleDuration,
    } = this.props;
    const delay = Math.max(0, rippleDuration - animationDuration);

    setTimeout(() => this.onClose(index), delay);
  }

  onLayout(event) {
    const { onLayout } = this.props;

    if (typeof onLayout === 'function') {
      onLayout(event);
    }
  }

  value() {
    const { value } = this.state;

    return value;
  }

  selectedIndex() {
    return -1;
  }

  selectedItem() {
    const { data } = this.props;

    return data[this.selectedIndex()];
  }

  isFocused() {
    return this.focused;
  }

  itemSize() {
    const { fontSize, itemPadding } = this.props;

    return Math.ceil(fontSize * 1.5 + itemPadding * 2);
  }

  visibleItemCount() {
    const { data, itemCount } = this.props;

    return Math.min(data.length, itemCount);
  }

  tailItemCount() {
    return Math.max(this.visibleItemCount() - 2, 0);
  }

  rippleInsets() {
    const {
      top = 16,
      right = 0,
      bottom = -8,
      left = 0,
    } = this.props.rippleInsets || {};

    return {
      top, right, bottom, left,
    };
  }

  resetScrollOffset() {
    const { selected } = this.state;
    const { data, dropdownPosition } = this.props;

    let offset = 0;
    const itemCount = data.length;
    const itemSize = this.itemSize();
    const tailItemCount = this.tailItemCount();
    const visibleItemCount = this.visibleItemCount();

    if (itemCount > visibleItemCount) {
      if (dropdownPosition == null) {
        switch (selected) {
          case -1:
            break;

          case 0:
          case 1:
            break;

          default:
            if (selected >= itemCount - tailItemCount) {
              offset = itemSize * (itemCount - visibleItemCount);
            } else {
              offset = itemSize * (selected - 1);
            }
        }
      } else {
        let index = selected - dropdownPosition;

        if (dropdownPosition < 0) {
          index -= visibleItemCount;
        }

        index = Math.max(0, index);
        index = Math.min(index, itemCount - visibleItemCount);

        if (!selected) {
          offset = itemSize * index;
        }
      }
    }

    if (this.scroll) {
      this.scroll.scrollToOffset({ offset, animated: false });
    }
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  keyExtractor(item, index) {
    const { valueExtractor } = this.props;

    return `${index}-${valueExtractor(item, index)}`;
  }

  renderBase(props) {
    const index = this.state.indexSelected;
    return (
      <BaseComponent index={index} label={props.label} data={props.data} />
    );
  }

  renderRipple() {
    const {
      baseColor,
      rippleColor = baseColor,
      rippleOpacity,
      rippleDuration,
      rippleCentered,
      rippleSequential,
    } = this.props;

    const { bottom, ...insets } = this.rippleInsets();
    const style = {
      ...insets,

      height: this.itemSize() - bottom,
      position: 'absolute',
    };

    return (
      <Ripple
        style={style}
        rippleColor={rippleColor}
        rippleDuration={rippleDuration}
        rippleOpacity={rippleOpacity}
        rippleCentered={rippleCentered}
        rippleSequential={rippleSequential}
        ref={this.updateRippleRef}
      />
    );
  }

  renderAccessory() {
    const { baseColor: backgroundColor } = this.props;
    const triangleStyle = { backgroundColor };

    return (
      <View style={styles.accessory}>
        <View style={styles.triangleContainer}>
          <View style={[styles.triangle, triangleStyle]} />
        </View>
      </View>
    );
  }

  renderItem({ item, index }) {
    if (item == null) {
      return null;
    }

    const { selected, leftInset, rightInset } = this.state;

    const {
      valueExtractor,
      labelExtractor,
      propsExtractor,
      textColor,
      itemColor,
      baseColor,
      selectedItemColor = textColor,
      disabledItemColor = baseColor,
      fontSize,
      itemTextStyle,
      rippleOpacity,
      rippleDuration,
      shadeOpacity,
    } = this.props;

    let props = propsExtractor(item, index);

    const { style, disabled }
      = props
      = {
          rippleDuration,
          rippleOpacity,
          rippleColor: baseColor,

          shadeColor: baseColor,
          shadeOpacity,

          ...props,

          onPress: this.onSelect,
        };

    const value = valueExtractor(item, index);
    const label = labelExtractor(item, index);

    props.style = [
      style,
      {
        height: this.itemSize(),
        paddingLeft: leftInset,
        paddingRight: rightInset,
      },
    ];

    return (
      <DropdownItem index={index} {...props}>
        {item}
      </DropdownItem>
    );
  }

  render() {
    const {
      renderBase,
      renderAccessory,
      containerStyle,
      overlayStyle: overlayStyleOverrides,
      pickerStyle: pickerStyleOverrides,

      rippleInsets,
      rippleOpacity,
      rippleCentered,
      rippleSequential,

      hitSlop,
      pressRetentionOffset,
      testID,
      nativeID,
      accessible,
      accessibilityLabel,

      supportedOrientations,

      ...props
    } = this.props;

    const {
      data,
      disabled,
      itemPadding,
      dropdownPosition,
    } = props;

    const {
      left, top, width, opacity, selected, modal,
    } = this.state;

    const itemCount = data.length;
    const visibleItemCount = this.visibleItemCount();
    const tailItemCount = this.tailItemCount();
    const itemSize = this.itemSize();

    const height = 2 * itemPadding + itemSize * visibleItemCount;
    let translateY = -itemPadding;

    if (dropdownPosition == null) {
      switch (selected) {
        case -1:
          translateY -= itemCount === 1 ? 0 : itemSize;
          break;

        case 0:
          break;

        default:
          if (selected >= itemCount - tailItemCount) {
            translateY -= itemSize * (visibleItemCount - (itemCount - selected));
          } else {
            translateY -= itemSize;
          }
      }
    } else if (dropdownPosition < 0) {
      translateY -= itemSize * (visibleItemCount + dropdownPosition);
    } else {
      translateY -= itemSize * dropdownPosition;
    }

    const overlayStyle = { opacity };

    const pickerStyle = {
      width,
      height,
      top,
      left,
      transform: [{ translateY }],
    };

    const touchableProps = {
      disabled,
      hitSlop,
      pressRetentionOffset,
      onPress: this.onPress,
      testID,
      nativeID,
      accessible,
      accessibilityLabel,
    };

    return (
      <View onLayout={this.onLayout} ref={this.updateContainerRef} style={containerStyle}>
        <TouchableWithoutFeedback {...touchableProps}>
          <View pointerEvents='box-only'>
            {this.renderBase(props)}
            {this.renderRipple()}
          </View>
        </TouchableWithoutFeedback>

        <Modal
          visible={modal}
          transparent
          onRequestClose={this.blur}
          supportedOrientations={supportedOrientations}
        >
          <Animated.View
            style={[styles.overlay, overlayStyle, overlayStyleOverrides]}
            onStartShouldSetResponder={() => true}
            onResponderRelease={this.blur}
          >
            <View
              style={[styles.picker, pickerStyle, pickerStyleOverrides]}
              onStartShouldSetResponder={() => true}
            >
              <FlatList
                ref={this.updateScrollRef}
                data={data}
                style={styles.scroll}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                scrollEnabled={visibleItemCount < itemCount}
                contentContainerStyle={styles.scrollContainer}
              />
            </View>
          </Animated.View>
        </Modal>
      </View>
    );
  }
}

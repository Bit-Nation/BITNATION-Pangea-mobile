import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import Colors from 'pangea-common-reactnative/styles/colors';

const styles = StyleSheet.create({
  fullTextWrapper: {
    opacity: 0,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  viewMoreText: {
    paddingTop: 5,
    color: Colors.BitnationLinkOrangeColor,
    textAlign: 'center',
  },
  transparent: {
    opacity: 0,
  },
  iconStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: Colors.BitnationLinkOrangeColor,
  },
});

class ViewMoreText extends React.Component {
  trimmedTextHeight = null;
  fullTextHeight = null;
  shouldShowMore = false;

  state = {
    isFulltextShown: true,
    numberOfLines: this.props.numberOfLines,
  }

  hideFullText = () => {
    if (
      this.state.isFulltextShown &&
      this.trimmedTextHeight &&
      this.fullTextHeight
    ) {
      this.shouldShowMore = this.trimmedTextHeight < this.fullTextHeight;
      this.setState({
        isFulltextShown: false,
      });
    }
  }

  onLayoutTrimmedText = (event) => {
    const {
      height,
    } = event.nativeEvent.layout;

    this.trimmedTextHeight = height;
    this.hideFullText();
  }

  onLayoutFullText = (event) => {
    const {
      height,
    } = event.nativeEvent.layout;

    this.fullTextHeight = height;
    this.hideFullText();
  }

  onPressMore = () => {
    this.setState({
      numberOfLines: null,
    }, () => {
      this.props.afterExpand();
    });
  }

  onPressLess = () => {
    this.setState({
      numberOfLines: this.props.numberOfLines,
    }, () => {
      this.props.afterCollapse();
    });
  }

  getWrapperStyle = () => {
    if (this.state.isFulltextShown) {
      return styles.transparent;
    }
    return {};
  }

  renderViewMore = () => (
    <TouchableOpacity onPress={this.onPressMore}>
      <Text
        style={styles.viewMoreText}
      >
      View More
      </Text>
      <Entypo
        style={styles.iconStyle}
        name='chevron-down'
      />
    </TouchableOpacity>
  )

  renderViewLess = () => (
    <TouchableOpacity onPress={this.onPressLess}>
      <Text
        style={styles.viewMoreText}
      >
      View Less
      </Text>
      <Entypo
        style={styles.iconStyle}
        name='chevron-up'
      />
    </TouchableOpacity>
  )

  renderFooter = () => {
    const {
      numberOfLines,
    } = this.state;

    if (this.shouldShowMore === true) {
      if (numberOfLines > 0) {
        return (this.props.renderViewMore || this.renderViewMore)(this.onPressMore);
      }
      return (this.props.renderViewLess || this.renderViewLess)(this.onPressLess);
    }
    return null;
  }

  renderFullText = () => {
    if (this.state.isFulltextShown) {
      return (
        <View onLayout={this.onLayoutFullText} style={styles.fullTextWrapper}>
          <Text style={this.props.textStyle}>{this.props.children}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={this.getWrapperStyle()}>
        <View onLayout={this.onLayoutTrimmedText}>
          <Text
            style={this.props.textStyle}
            numberOfLines={this.state.numberOfLines}
          >
            {this.props.children}
          </Text>
          {this.renderFooter()}
        </View>

        {this.renderFullText()}
      </View>
    );
  }
}

ViewMoreText.propTypes = {
  renderViewMore: PropTypes.func,
  renderViewLess: PropTypes.func,
  afterCollapse: PropTypes.func,
  afterExpand: PropTypes.func,
  numberOfLines: PropTypes.number.isRequired,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ViewMoreText.defaultProps = {
  afterCollapse: () => {},
  afterExpand: () => {},
  textStyle: {},
  children: null,
};

export default ViewMoreText;

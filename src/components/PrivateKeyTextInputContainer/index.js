import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  findNodeHandle,
} from 'react-native';
import PropTypes from 'prop-types';

import styles, { cursorColor } from './styles';

/**
 * Component that renders text input view for private key input process.
 * @type React.Component
 */
class PrivateKeyTextInputContainer extends Component {

  constructor(props) {
    super(props);

    this.textInput = null;
  }

  render() {
    const { style } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          underlineColorAndroid='transparent'
          editable={this.props.editable}
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType={this.props.isLast ? 'done' : 'next'}
          style={styles.textInput}
          value={this.props.value}
          blurOnSubmit={this.props.isLast}
          selectionColor={cursorColor}
          onFocus={(event) => this.props.onFocus(this.props.index, findNodeHandle(event.target))}
          onChangeText={(text) => this.props.onChange(this.props.index, text)}
          onSubmitEditing={() => this.props.onSubmit(this.props.index)}
          ref={(textInput) => this.textInput = textInput}/>
        <Text style={styles.text}>{this.props.label}</Text>
      </View>
    );
  }

}

PrivateKeyTextInputContainer.propTypes = {
  /**
   * @desc Used to identify component among each other.
   */
  index: PropTypes.number,
  /**
   * @desc Text label to be rendered below component. Used to show number of field.
   */
  label: PropTypes.string,
  /**
   * @desc Text value of wrapped text field.
   */
  value: PropTypes.string,
  /**
   * @desc Determines if the field is last. This change behavior of keyboard handling.
   */
  isLast: PropTypes.bool,
  /**
   * @desc Determines if text field should be editable.
   */
  editable: PropTypes.bool,
  /**
   * @desc Callback on change text of wrapped text field.
   */
  onChange: PropTypes.func,
  /**
   * @desc Callback on submit of wrapped text field.
   */
  onSubmit: PropTypes.func,
  /**
   * @desc Callback on focus of wrapped text field.
   */
  onFocus: PropTypes.func,
};

PrivateKeyTextInputContainer.defaultProps = {
  editable: true,
  value: '',
  isLast: true,
  index: 0,
};

export default PrivateKeyTextInputContainer;
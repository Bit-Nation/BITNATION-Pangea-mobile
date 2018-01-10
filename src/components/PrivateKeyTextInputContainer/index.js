import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles, { cursorColor } from './styles';

export class PrivateKeyTextInputContainer extends Component {

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
          returnKeyType={this.props.isLast ? 'done' : 'next'}
          style={styles.textInput}
          value={this.props.value}
          blurOnSubmit={this.props.isLast}
          selectionColor={cursorColor}
          onChangeText={(text) => this.props.onChange(this.props.index, text)}
          onSubmitEditing={() => this.props.onSubmit(this.props.index)}
          ref={(textInput) => this.textInput = textInput}/>
        <Text style={styles.text}>{this.props.label}</Text>
      </View>
    );
  }

};

PrivateKeyTextInputContainer.propTypes = {
  index: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.string,
  isLast: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  editable: PropTypes.bool,
};

PrivateKeyTextInputContainer.defaultProps = {
  editable: true,
  value: '',
  isLast: true,
  index: 0,
};

export default PrivateKeyTextInputContainer;
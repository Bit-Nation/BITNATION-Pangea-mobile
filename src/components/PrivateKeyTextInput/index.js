import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export class PrivateKeyTextInput extends Component {

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
          onValueChange={(text) => this.props.onChange(this.props.index, text)}
          onSubmitEditing={() => this.props.onSubmit(this.props.index)}/>
        <Text style={styles.text}>{this.props.index}</Text>
      </View>
    );
  }

};

PrivateKeyTextInput.propTypes = {
  index: PropTypes.number,
  value: PropTypes.string,
  isLast: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  editable: PropTypes.bool,
};

PrivateKeyTextInput.defaultProps = {
  editable: true,
  value: '',
  isLast: true,
  index: 0,
};

export default PrivateKeyTextInput;
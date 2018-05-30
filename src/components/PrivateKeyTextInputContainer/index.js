// @flow

import * as React from 'react';
import { Text, TextInput, View, findNodeHandle } from 'react-native';

import styles, { cursorColor } from './styles';

type Props = {
  /**
   * @desc Used to identify component among each other.
   */
  index: number,
  /**
   * @desc Text label to be rendered below component. Used to show number of field.
   */
  label: string,
  /**
   * @desc Text value of wrapped text field.
   */
  value: string,
  /**
   * @desc Determines if the field is last. This change behavior of keyboard handling.
   */
  isLast: boolean,
  /**
   * @desc Determines if text field should be editable.
   */
  editable: boolean,
  /**
   * @desc Callback on change text of wrapped text field.
   */
  onChange: (number, string) => void,
  /**
   * @desc Callback on submit of wrapped text field.
   */
  onSubmit: number => void,
  /**
   * @desc Callback on focus of wrapped text field.
   */
  onFocus: (number, ?number) => void,
  /**
   * @desc Style object to be applied on root view on top of default style.
   */
  style: any
};

/**
 * Component that renders text input view for private key input process.
 * @type {React.Component}
 */
class PrivateKeyTextInputContainer extends React.Component<Props> {
  static defaultProps: Object;

  constructor(props: Props) {
    super(props);

    this.textInput = null;
  }

  textInput: React.Element<"TextInput"> | null;

  render() {
    const {
      style,
      editable,
      isLast,
      value,
      index,
      label,
      onFocus,
      onSubmit,
      onChange,
    } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          underlineColorAndroid='transparent'
          editable={editable}
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType={isLast ? 'done' : 'next'}
          style={styles.textInput}
          value={value}
          blurOnSubmit={isLast}
          selectionColor={cursorColor}
          onFocus={event => onFocus(index, findNodeHandle(event.target))}
          onChangeText={text => onChange(index, text)}
          onSubmitEditing={() => onSubmit(index)}
          ref={textInput => (this.textInput = textInput)}
        />
        <Text style={styles.text}>{label}</Text>
      </View>
    );
  }
}

PrivateKeyTextInputContainer.defaultProps = {
  editable: true,
  label: '',
  value: '',
  isLast: true,
  index: 0,
  onFocus: () => undefined,
  onSubmit: () => undefined,
  onChange: () => undefined,
  style: {},
};

export default PrivateKeyTextInputContainer;

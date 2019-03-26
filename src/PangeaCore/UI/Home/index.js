import React, { Component } from 'react';
import { ImageBackground, Platform, StatusBar } from 'react-native';
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Toast,
} from 'native-base';
// import { Field, reduxForm } from 'redux-form';
import styles from './styles';
import Colors from 'pangea-common-reactnative/styles/colors';

// const commonColor = require('../../theme/variables/commonColor');
const backgroundImage = require('pangea-common-reactnative/assets/images/glow2.png');
const logo = require('pangea-common-reactnative/assets/images/logo.png');

// const required = value => (value ? undefined : 'Required');
// const maxLength = max => value =>
//   (value && value.length > max ? `Must be ${max} characters or less` : undefined);
// const maxLength15 = maxLength(15);
// const minLength = min => value =>
//   (value && value.length < min ? `Must be ${min} characters or more` : undefined);
// const minLength8 = minLength(8);
// const email = value =>
//   (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? "Invalid email address"
//     : undefined);
// const alphaNumeric = value =>
//   (value && /[^a-zA-Z0-9 ]/i.test(value)
//     ? "Only alphanumeric characters"
//     : undefined);

declare type Any = any;
class Home extends Component {
  textInput: Any;

  renderInput({
    input, label, type, meta: { touched, error, warning },
  }) {
    return (
      <View>
        <Item error={error && touched} style={styles.inputGrp}>
          <Icon
            active
            name={input.name === 'email' ? 'mail' : 'unlock'}
            style={{ color: '#fff' }}
          />
          <Input
            ref={c => (this.textInput = c)}
            placeholderTextColor='rgba(230,230,230,0.8)'
            style={styles.input}
            placeholder={input.name === 'email' ? 'Email' : 'Password'}
            secureTextEntry={input.name === 'password'}
            {...input}
          />
          {touched && error
            ? <Icon
              active
              style={styles.formErrorIcon}
              onPress={() => this.textInput._root.clear()}
              name='close'
            />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
            {error}
          </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }

  login() {
    if (this.props.valid) {
      this.props.navigation.navigate('Drawer');
    } else {
      Toast.show({
        text: 'Enter Valid Username & Password!',
        duration: 2500,
        position: 'top',
        textStyle: { textAlign: 'center' },
      });
    }
  }

  render() {
    return (
      <Container>
        {/* <StatusBar
          backgroundColor={
            Platform.OS === 'android'
              ? commonColor.statusBarColor
              : 'transparent'
          }
          barStyle='light-content'
        /> */}
        <Content style={{ backgroundColor: Colors.BitnationDarkColor }}>
          <ImageBackground
            source={backgroundImage}
            style={styles.containerImage}
          >
            <ImageBackground source={logo} style={styles.logoShadowImage}>
              <View style={styles.bgView}>
                {/* <TextInput
                  name='email'
                  component={this.renderInput}
                  type='email'
                  validate={[email, required]}
                />
                <Field
                  name='password'
                  component={this.renderInput}
                  type='password'
                  validate={[alphaNumeric, minLength8, maxLength15, required]}
                /> */}
                <Button
                  light
                  transparent
                  // onPress={() => this.props.navigation.navigate('Drawer')}
                  style={{
                    alignSelf: 'flex-end',
                    marginBottom: Platform.OS === 'ios' ? 5 : 0,
                    marginTop: Platform.OS === 'ios' ? -10 : 0,
                  }}
                >
                  <Text>Forgot Password</Text>
                </Button>
                <Button
                  light
                  rounded
                  block
                  style={{ marginBottom: 10 }}
                  // onPress={() => this.login()}
                >
                  <Text style={{ color: Colors.white }}>Login</Text>
                </Button>
                <Button
                  light
                  transparent
                  style={{ alignSelf: 'center' }}
                  // onPress={() => this.props.navigation.navigate('SignUp')}
                >
                  <Text>Sign Up Here</Text>
                </Button>
              </View>
            </ImageBackground>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

export default Home;

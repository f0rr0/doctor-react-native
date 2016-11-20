/**
 * @providesModule Login
 */

import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import TextInput from 'MaterialTextInput';
import { NavigationStyles } from '@exponent/ex-navigation';
import { connect } from 'react-redux';
import AppBar from 'AppBar';
import actions from 'actions';
import colors from 'colors';
import fonts from 'fonts';

const styles = StyleSheet.create({
  full: {
    flex: 1
  },
  loginContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black
  },
  welocomeMessage: {
    marginBottom: 8,
    fontSize: 24,
    lineHeight: 36,
    color: colors.mediumGrey
  },
  loginMessage: {
    marginBottom: 40,
    fontSize: 14,
    lineHeight: 21
  },
  loginButton: {
    marginTop: 33,
    backgroundColor: colors.turquoise,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontFamily: fonts.medium,
    color: colors.white,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16
  },
  forgotPasswordRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 11
  },
  passwordActionText: {
    color: colors.turquoise,
    fontSize: 12,
    lineHeight: 18,
  }
});

@connect(({ user }) => ({ user }))
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: props.user.phone_number || '',
      password: ''
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.CLEAR_ROUTE_STACK('login'));
  }

  render() {
    const { dispatch } = this.props;
    const { phone_number, password } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.full}>
          <StatusBar
            backgroundColor={colors.gunmetal}
            barStyle="light-content"
          />
          <AppBar title="Login" leftTouchButtons="none" />
            <View style={styles.loginContainer}>
              <Text style={[ styles.text, styles.welocomeMessage ]}>
                Welcome back!
              </Text>
              <Text style={[ styles.text, styles.loginMessage ]}>
                Login to continue to 1mg Doctors
              </Text>
              <TextInput
                maxLength={10}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
                label="Phone Number"
                highlightColor={colors.turquoise}
                labelColor={colors.mediumGrey}
                selectionColor={colors.turquoise}
                value={this.state.phone_number}
                onChangeText={phone_number => this.setState({ phone_number })}
              />
              <TextInput
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                label="Password"
                secureTextEntry
                showUnmask
                highlightColor={colors.turquoise}
                labelColor={colors.mediumGrey}
                selectionColor={colors.turquoise}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <View style={styles.forgotPasswordRow}>
                <TouchableOpacity
                  onPress={() => dispatch(actions.GO_TO_ROUTE('sendOTP'))}
                  activeOpacity={1}
                >
                  <Text style={[ styles.text, styles.passwordActionText ]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => dispatch(actions.SIGN_IN({
                  phone_number,
                  password
                }))}
                activeOpacity={1}
                style={styles.loginButton}
              >
                <Text style={styles.loginText}>
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Login.route = {
  styles: {
    ...NavigationStyles.SlideVertical,
    gestures: null
  }
};

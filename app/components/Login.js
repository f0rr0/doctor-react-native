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
  Platform,
  StyleSheet
} from 'react-native';
import TextInput from 'MaterialTextInput';
import { NavigationStyles } from '@exponent/ex-navigation';
import { connect } from 'react-redux';
import AppBar from 'AppBar';
import actions from 'actions';
import colors from 'colors';

const styles = StyleSheet.create({
  full: {
    flex: 1
  },
  loginContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  text: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
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
    marginTop: 25,
    backgroundColor: colors.turquoise,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica-Bold' : 'sans-serif-medium',
    color: colors.white,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16
  },
  passwordActionsRow: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  passwordActionsContainer: {
    alignItems: 'center'
  },
  passwordActionText: {
    width: 150,
    marginTop: 10,
    marginBottom: 10,
    color: colors.turquoise,
    fontSize: 14,
    textAlign: 'center'
  },
  verticalDivider: {
    backgroundColor: colors.turquoise,
    width: 1,
    height: 35
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: props.user.phone_number || '',
      password: ''
    };
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
          <AppBar title="Login" />
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
              <View style={styles.passwordActionsRow}>
                <View style={styles.passwordActionsContainer}>
                  <TouchableOpacity
                    onPress={() => dispatch(actions.SHOW_MODAL('Authenticating...'))}
                    activeOpacity={1}
                  >
                    <Text style={[
                      styles.text, styles.passwordActionText
                     ]}>
                      Create New Password
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.passwordActionsContainer}>
                  <TouchableOpacity
                    onPress={() => dispatch(actions.GO_TO_ROUTE('sendOTP'))}
                    activeOpacity={1}
                  >
                    <Text style={[
                      styles.text, styles.passwordActionText
                    ]}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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

export default connect(({ user }) => ({ user }))(Login);

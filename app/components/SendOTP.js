/**
 * @providesModule SendOTP
 */

import React, { Component } from 'react';
import {
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
  forgotMessage: {
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
    marginTop: 25
  },
  passwordActionsContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  passwordActionText: {
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

class SendOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: props.user.phone_number,
    };
  }

  render() {
    const { dispatch } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.full}>
          <AppBar title="Forgot Password" />
            <View style={styles.loginContainer}>
              <Text style={[ styles.text, styles.forgotMessage ]}>
                Enter your phone number and we will send you instructions to reset your password
              </Text>
              <TextInput
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
              <TouchableOpacity
                activeOpacity={1}
                style={styles.loginButton}
              >
                <Text style={styles.loginText}>
                  SEND OTP
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(({ user }) => ({ user }))(SendOTP);

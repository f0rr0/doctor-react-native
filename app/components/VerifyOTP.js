/**
 * @providesModule VerifyOTP
 */

import React, { PureComponent } from 'react';
import {
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
    flex: 1,
    backgroundColor: colors.white
  },
  loginContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  text: {
    fontFamily: fonts.regular,
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
export default class VerifyOTP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
    };
  }

  render() {
    const { dispatch, user } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.full}>
          <AppBar title="Forgot Password" />
            <View style={styles.loginContainer}>
              <Text style={[ styles.text, styles.forgotMessage ]}>
                Please enter the OTP sent to your registered mobile number
              </Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
                label="OTP"
                highlightColor={colors.turquoise}
                labelColor={colors.mediumGrey}
                selectionColor={colors.turquoise}
                value={this.state.otp}
                onChangeText={otp => this.setState({ otp })}
              />
              <View style={styles.forgotPasswordRow}>
                <TouchableOpacity
                  onPress={() => dispatch(actions.SEND_OTP(user.phone_number))}
                  activeOpacity={1}
                >
                  <Text style={[ styles.text, styles.passwordActionText ]}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.loginButton}
                onPress={() => dispatch(actions.VERIFY_OTP(this.state.otp))}
              >
                <Text style={styles.loginText}>
                  CONFIRM OTP
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

VerifyOTP.route = {
  styles: {
    ...NavigationStyles.Fade,
    gestures: null
  }
};

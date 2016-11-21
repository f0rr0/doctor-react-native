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
  }
});

@connect(({ user }) => ({ user }))
export default class SendOTP extends Component {
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
                onPress={() => dispatch(actions.SEND_OTP(this.state.phone_number))}
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

SendOTP.route = {
  styles: {
    ...NavigationStyles.Fade,
    gestures: null
  }
};

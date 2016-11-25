/**
 * @providesModule ResetPassword
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
    flex: 1
  },
  loginContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: colors.white
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black
  },
  loginButton: {
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

@connect(null)
export default class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm_password: '',
      reset_token: props.params
    };
  }

  render() {
    const { dispatch } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.full}>
          <AppBar title="Reset Password" />
            <View style={[ styles.loginContainer, styles.full ]}>
              <TextInput
                secureTextEntry
                showUnmask
                autoCapitalize="none"
                autoCorrect={false}
                label="New Password"
                highlightColor={colors.turquoise}
                labelColor={colors.mediumGrey}
                selectionColor={colors.turquoise}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <TextInput
                secureTextEntry
                showUnmask
                autoCapitalize="none"
                autoCorrect={false}
                label="Confirm New Password"
                highlightColor={colors.turquoise}
                labelColor={colors.mediumGrey}
                selectionColor={colors.turquoise}
                value={this.state.confirm_password}
                onChangeText={confirm_password => this.setState({ confirm_password })}
              />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.loginButton}
              onPress={() => dispatch(actions.RESET_PASSWORD(this.state))}
            >
              <Text style={styles.loginText}>
                CONFIRM
              </Text>
            </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

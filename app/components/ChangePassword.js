/**
 * @providesModule ChangePassword
 */

import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
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
  loginButton: {
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
  }
});

@connect(null)
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_password: '',
      new_password: '',
      confirm_new_password: ''
    };
  }

  render() {
    const { dispatch } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.full}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.full}>
            <AppBar title="Forgot Password" />
              <View style={[ styles.loginContainer, styles.full ]}>
                <TextInput
                  secureTextEntry
                  showUnmask
                  autoCapitalize="none"
                  autoCorrect={false}
                  label="Current Password"
                  highlightColor={colors.turquoise}
                  labelColor={colors.mediumGrey}
                  selectionColor={colors.turquoise}
                  value={this.state.current_password}
                  onChangeText={current_password => this.setState({ current_password })}
                />
                <TextInput
                  secureTextEntry
                  showUnmask
                  autoCapitalize="none"
                  autoCorrect={false}
                  label="New Password"
                  highlightColor={colors.turquoise}
                  labelColor={colors.mediumGrey}
                  selectionColor={colors.turquoise}
                  value={this.state.new_password}
                  onChangeText={new_password => this.setState({ new_password })}
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
                  value={this.state.confirm_new_password}
                  onChangeText={confirm_new_password => this.setState({ confirm_new_password })}
                />
              </View>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.loginButton}
              >
                <Text style={styles.loginText}>
                  CONFIRM
                </Text>
              </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

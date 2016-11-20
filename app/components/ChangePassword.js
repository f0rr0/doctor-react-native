/**
 * @providesModule ChangePassword
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
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      new_password: '',
      confirm_password: ''
    };
  }

  render() {
    const { dispatch } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.full}>
          <AppBar title="Change Password" />
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
                value={this.state.old_password}
                onChangeText={old_password => this.setState({ old_password })}
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
                value={this.state.confirm_password}
                onChangeText={confirm_password => this.setState({ confirm_password })}
              />
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.loginButton}
              onPress={() => dispatch(actions.CHANGE_PASSWORD(this.state))}
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

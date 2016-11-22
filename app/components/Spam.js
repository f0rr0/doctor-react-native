/**
 * @providesModule Spam
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import AppBar from 'AppBar';
import ConversationList from 'ConversationList';
import colors from 'colors';

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: colors.white
  }
});

function Spam({ conversations, speciality }) {
  return (
    <View style={styles.full}>
      <AppBar title="Spam" />
      <ConversationList
        active={true}
        speciality={speciality}
        category={'spam'}
        conversations={conversations['spam']}
      />
    </View>
  );
}

export default connect(({ conversations, speciality }) => ({ conversations, speciality }))(Spam);

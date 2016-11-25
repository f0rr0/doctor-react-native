/**
 * @providesModule ConversationRow
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { memoize } from 'lodash-es';
import actions from 'actions';
import colors from 'colors';
import fonts from 'fonts';
import moment from 'moment';
import { fromNow } from 'date';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white
  },
  timestamp: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2
  },
  textTimestamp: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mediumGrey
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textAvatar: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.white
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16
  },
  textName: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    color: colors.black
  },
  textInfo: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.darkGrey
  },
  badge: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.turquoise,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBadge: {
    fontFamily: fonts.medium,
    fontSize: 9,
    color: colors.white
  }
});

const Touchable = ({ children, onPress }) => {
  if (Platform.OS === 'ios' || Platform.Version < 21) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.SelectableBackground()}
    >
      {children}
    </TouchableNativeFeedback>
  );
};

const getAvatarColor = memoize((rowID) => {
  const rem = rowID % 6;
  switch (rem) {
    case 0: return colors.green;
    case 1: return colors.yellow;
    case 2: return colors.red;
    case 3: return colors.purple;
    case 4: return colors.blue;
    case 5: return colors.mediumGrey;
  }
});

function ConversationRow({ conversation, rowID, dispatch }) {
  const onPress = () => {
    dispatch(actions.GET_MESSAGES(conversation));
    dispatch(actions.GO_TO_ROUTE('messages', conversation));
  };
  return(
    <Touchable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.timestamp}>
          <Text style={styles.textTimestamp}>
            {fromNow(conversation.date, conversation.time)}
          </Text>
        </View>
        <View style={[ styles.avatar, {
          backgroundColor: getAvatarColor(rowID)
        }]}>
          <Text style={styles.textAvatar}>
            {conversation.patient_name.charAt(0)}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.textName}
          >
            {conversation.patient_name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.textInfo}
          >
            {conversation.patient_age}, {conversation.patient_gender}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.textInfo}
          >
            {conversation.message || 'NULL :('}
          </Text>
        </View>
        {/* <View style={styles.badge}><Text style={styles.textBadge}>3</Text></View> */}
      </View>
    </Touchable>
  );
}

export default connect(null)(ConversationRow);

/**
 * @providesModule Messages
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import AppBar from 'AppBar';
import {
  GiftedChat,
  Bubble,
  MessageText,
  Time,
  Message
} from 'react-native-gifted-chat';
import deepEqual from 'deep-equal';
import { connect } from 'react-redux';
import actions from 'actions';
import colors from 'colors';
import fonts from 'fonts';
import { parseStupidDateToISO } from 'date';

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    color: colors.turquoise,
    margin: 10
  }
});

const bubbleStyles = StyleSheet.create({
  left: {
    backgroundColor: colors.flashWhite,
    borderRadius: 15
  },
  right: {
    backgroundColor: colors.lightTurquoise,
    borderRadius: 15
  }
});

const timeTextStyles = (() => {
  const styles = {
    fontSize: 10,
    fontFamily: fonts.regular,
    color: colors.mediumGrey,
    textAlign: 'left'
  };
  return StyleSheet.create({
    left: {
      ...styles,
      textAlign: 'left'
    },
    right: {
      ...styles,
      textAlign: 'right'
    }
  });
})();

const messageTextStyles = (() => {
  const styles = {
    color: colors.darkGrey,
    fontFamily: fonts.regular,
    fontSize: 14
  };
  return StyleSheet.create({
    left: {
      ...styles
    },
    right: {
      ...styles
    }
  });
})();

const messageContainerStyles = StyleSheet.create({
  left: {
    marginLeft: 0
  }
});

const LoadingView = () => (
  <View style={[ styles.full, styles.center ]}>
    <ActivityIndicator
      size={Platform.OS === 'ios' ? 'large' : 65}
      color={colors.turquoise}
    />
  </View>
);

const ErrorData = ({ onPress = () => {} }) => (
  <View style={[ styles.full, styles.center ]}>
    <Text>Something went wrong</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.errorText}>Try Again</Text>
    </TouchableOpacity>
  </View>
);

@connect(({ messages, user }) => ({ messages, user }))
export default class Messages extends Component {
  constructor(props) {
    super(props);
  }

  // shouldComponentUpdate({ messages: nextMessages, params: nextConversation }) {
  //   const { messages, params: conversation } = this.props;
  //   if (nextMessages.messages.length !== messages.messages.length || nextConversation.id !== conversation.id || nextMessages.loading !== messages.loading) {
  //     console.log('update');
  //     return true;
  //   };
  //   return false;
  // }

  onTryAgain = () => {
    const { dispatch, messages, params: conversation } = this.props;
    if (!messages.loading) {
      dispatch(actions.GET_MESSAGES(conversation));
    }
  }

  renderMessage = props =>
    <Message
      {...props}
      containerStyle={messageContainerStyles}
    />

  renderTime = props =>
    <Time
      {...props}
      textStyle={timeTextStyles}
    />

  renderMessageText = props =>
    <MessageText
      {...props}
      textStyle={messageTextStyles}
    />

  renderBubble = props =>
    <Bubble
      {...props}
      wrapperStyle={bubbleStyles}
      renderMessageText={this.renderMessageText}
      renderTime={this.renderTime}
    />

  mapWithContext = (user, conversation) => (message) => ({
    _id: message.id,
    text: message.text,
    createdAt: parseStupidDateToISO(message.date, message.time),
    user: {
      _id: message.user_type === 'doctor' ? 1 : 2,
      name: message.user_type === 'doctor' ? user.name : conversation.patient_name
    },
    image: message.user_attachments.length > 0 ? message.user_attachments[0].image.image.thumb.url : ''
  })

  render() {
    const { params: conversation, messages, user } = this.props;
    const { messages: data = [] } = messages;
    const content = (() => {
      if (messages.loading) {
        return <LoadingView />;
      } else if (data.length > 0) {
        return (
          <GiftedChat
            isAnimated
            loadEarlier={messages.has_more}
            renderMessage={this.renderMessage}
            renderAvatar={() => null}
            renderBubble={this.renderBubble}
            messages={data.map(this.mapWithContext(user, conversation))}
            onSend={(messages = []) => console.log(messages)}
            user={{
              _id: 1,
              name: user.name
            }}
          />
        );
      } else if (messages.error) {
        return <ErrorData onPress={this.onTryAgain} />;
      }
    })();
    return (
      <View style={styles.full}>
        <AppBar
          title={conversation.patient_name}
          subTitle={`${conversation.patient_age}, ${conversation.patient_gender}`}
          rightTouchButtons={[{
            icon: require('../assets/drawable-xxhdpi/flag_icon.png'),
            onPress: () => console.log('mark as spam'),
            style: {
              height: 18,
              width: 14
            }
          }]}
        />
        {content}
      </View>
    );
  }
}

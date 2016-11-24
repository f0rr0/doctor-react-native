/**
 * @providesModule Messages
 */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
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
  Message,
  InputToolbar
} from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import actions from 'actions';
import colors from 'colors';
import fonts from 'fonts';
import { parseStupidDateToISO } from 'date';

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: colors.white
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
    borderRadius: 15,
    borderBottomLeftRadius: 0
  },
  right: {
    backgroundColor: colors.lightTurquoise,
    borderRadius: 15,
    borderBottomRightRadius : 0
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

const inputToolbarStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.paleYellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.grey,
  },
  statusText: {
    color: colors.dirtyBrown,
    fontFamily: fonts.regular,
    fontSize: 12,
    fontStyle: 'italic'
  }
});

const sendStyles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    width: 20,
    height: 20,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10
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
export default class Messages extends PureComponent {
  constructor(props) {
    super(props);
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

  renderInputToolbar = messages => props => {
    const { status } = messages;
    if (status.status === 'closed') {
      return (
        <View style={inputToolbarStyles.container}>
          <Text style={inputToolbarStyles.statusText}>{status.message}</Text>
        </View>
      );
    }
    return <InputToolbar {...props} />;
  }

  renderSend = props =>
    <TouchableOpacity
      onPress={() => props.onSend({text: props.text.trim()}, true)}
      accessibilityTraits="button"
      style={sendStyles.container}
    >
      <Image
        source={require('../assets/drawable-xxhdpi/fill_31.png')}
        style={sendStyles.button}
      />
    </TouchableOpacity>

  mapWithContext = (user, conversation) => (message) => ({
    _id: message.id,
    text: message.text,
    createdAt: parseStupidDateToISO(message.date, message.time),
    user: {
      _id: message.user_type
    },
    image: message.user_attachments.length > 0 ? message.user_attachments[0].image.image.thumb.url : ''
  })

  onTryAgain = () => {
    const { dispatch, messages, params: conversation } = this.props;
    if (!messages.loading && !messages.loading_more) {
      dispatch(actions.GET_MESSAGES(conversation));
    }
  }

  onLoadEarlier = () => {
    const { dispatch, messages, params: conversation } = this.props;
    if (!messages.loading && !messages.loading_more) {
      const pgn = (messages.messages.length / 6) + 1;
      dispatch(actions.LOAD_MORE_MESSAGES(conversation, pgn));
    }
  }

  handleMarkSpam = () => {
    const { dispatch, params: { id } } = this.props;
    dispatch(actions.SHOW_MODAL_DIALOG('mark_spam', () => console.log(id)));
  }

  render() {
    const { params: conversation, messages, user } = this.props;
    const { messages: data } = messages;
    const content = (() => {
      if (messages.loading) {
        return <LoadingView />;
      } else if (messages.error) {
        return <ErrorData onPress={this.onTryAgain} />;
      } else if (data.length > 0) {
        return (
          <GiftedChat
            isAnimated
            loadEarlier={messages.has_more}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={messages.loading_more}
            renderMessage={this.renderMessage}
            renderAvatar={() => null}
            renderBubble={this.renderBubble}
            renderSend={this.renderSend}
            renderInputToolbar={this.renderInputToolbar(messages)}
            messages={data.map(this.mapWithContext(user, conversation))}
            onSend={(messages = []) => console.log(messages)}
            user={{ _id: 'doctor' }}
          />
        );
      }
    })();
    return (
      <View style={styles.full}>
        <AppBar
          title={conversation.patient_name}
          subTitle={`${conversation.patient_age}, ${conversation.patient_gender}`}
          rightTouchButtons={[{
            icon: require('../assets/drawable-xxhdpi/flag_icon.png'),
            onPress: this.handleMarkSpam,
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

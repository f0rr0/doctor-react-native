/**
 * @providesModule reducers
 */

export function userReducer(user = {}, action) {
  const { payload = {}, type } = action;
  if (type === 'SET_USER_INFO') {
    return Object.assign({}, user, payload);
  }
  return user;
}

export function specialityReducer(speciality = {}, action) {
  const { payload = {}, type } = action;
  if (type === 'SET_USER_SPECIALITY') {
    return Object.assign({}, speciality, payload);
  }
  return speciality;
}

const CONVERSATION_BASE_SHAPE = {
  conversations: [],
  loading: false,
  refreshing: false,
  error: false
};

export function conversationsReducer(conversations = {
  new: CONVERSATION_BASE_SHAPE,
  follow_up: CONVERSATION_BASE_SHAPE,
  all: CONVERSATION_BASE_SHAPE,
  spam: CONVERSATION_BASE_SHAPE
}, action) {
  const { payload = {}, type } = action;
  const { category } = payload;
  const current = conversations[category];
  const { data = {} } = payload;
  switch (type) {
    case 'TOGGLE_CONVERSATIONS_REFRESHING':
      return Object.assign({}, conversations, {
        [category]: {
          ...current,
          refreshing: !current.refreshing,
          error: false,
          loading: false
        }
      });
    case 'TOGGLE_CONVERSATIONS_LOADING':
      return Object.assign({}, conversations, {
        [category]: {
          ...current,
          loading: !current.loading,
          error: false,
          refreshing: false
        }
      });
    case 'TOGGLE_CONVERSATIONS_ERROR':
      return Object.assign({}, conversations, {
        [category]: {
          ...current,
          error: !current.error,
          loading: false,
          refreshing: false
        }
      });
    case 'SET_CONVERSATIONS':
      return Object.assign({}, conversations, {
        [category]: {
          ...current,
          ...data
        }
      });
    case 'APPEND_CONVERSATIONS':
      return Object.assign({}, conversations, {
        [category]: {
          ...current,
          ...data,
          conversations: [
            ...current.conversations,
            ...data.conversations
          ]
        }
      });
    default:
      return conversations;
  }
}

const MESSAGES_BASE_SHAPE = {
  messages: [],
  loading: false,
  error: false,
  loading_more: false
};

export function messagesReducer(messages = MESSAGES_BASE_SHAPE, action) {
  const { payload = {}, type } = action;
  switch (type) {
    case 'TOGGLE_MESSAGES_LOADING':
      return Object.assign({}, messages, {
        loading: !messages.loading,
        error: false,
        loading_more: false
      });
    case 'TOGGLE_MESSAGES_ERROR':
      return Object.assign({}, messages, {
        error: !messages.error,
        loading: false,
        loading_more: false
      });
    case 'TOGGLE_MESSAGES_LOADING_MORE':
      return Object.assign({}, messages, {
        loading_more: !messages.loading_more,
        error: false,
        loading: false
      });
    case 'SET_MESSAGES':
      return Object.assign({}, messages, payload.messages);
    case 'APPEND_MESSAGES':
      return Object.assign({}, messages, payload.messages, {
        messages: [
          ...messages.messages,
          ...payload.messages.messages
        ]
      });
    default:
      return messages;
  }
}

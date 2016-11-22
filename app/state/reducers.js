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
  all: CONVERSATION_BASE_SHAPE
}, action) {
  const { payload = {}, type } = action;
  const { category = 'new' } = payload;
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

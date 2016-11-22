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

export function conversationsReducer(conversations = {
  new: {
    conversations: []
  },
  follow_up: {
    conversations: []
  },
  all: {
    conversations: []
  }
}, action) {
  const { payload = {}, type } = action;
  const { category } = payload;
  const current = conversations[category] || {};
  switch (type) {
    case 'TOGGLE_CONVERSATIONS_REFRESHING':
      return Object.assign({}, conversations, {
        [category]: {
          ...current,
          refreshing: !!!current.refreshing
        }
      });
    case 'TOGGLE_CONVERSATIONS_LOADING':
      return Object.assign({}, conversations, {
        [category]: {
          ...current,
          loading: !!!current.loading
        }
      });
    case 'SET_CONVERSATIONS':
      const { data } = payload;
      return Object.assign({}, conversations, {
        [category]: {
          ...current,
          ...data
        }
      });
    default:
      return conversations;
  }
}

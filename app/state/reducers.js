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

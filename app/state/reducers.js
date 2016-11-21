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

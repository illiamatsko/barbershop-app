import {userInitialSlice, userSlice} from './user.slice';

export function setUser(res: userSlice): userSlice {
  return {
    user: res.user,
    token: res.token
  }
}

export function unsetUser() {
  return userInitialSlice;
}

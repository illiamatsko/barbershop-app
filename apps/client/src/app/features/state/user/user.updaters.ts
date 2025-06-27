import { userSlice } from './user.slice';

export function setUser(res: userSlice) {
  return {
    user: res.user,
    token: res.token
  }
}

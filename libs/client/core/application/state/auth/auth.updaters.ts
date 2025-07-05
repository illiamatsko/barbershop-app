import { authState } from './auth.state';

export function setUser(res: authState): authState {
  return {
    user: res.user,
    token: res.token
  }
}

import { AuthState } from './auth.state';

export function setUser(res: AuthState): AuthState {
  return {
    user: res.user,
    token: res.token
  }
}

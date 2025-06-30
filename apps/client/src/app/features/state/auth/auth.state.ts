import { JwtPayload } from '@barbershop-app/models';

export interface authState {
  user: JwtPayload,
  token: string
}

export const initialAuthState: authState = {
  user: {
    id: -1,
    email: '',
    role: ''
  },
  token: ''
}

import { JwtPayload } from '@barbershop-app/shared/types';

export interface authState {
  user: JwtPayload,
  token: string
}

export const initialAuthState: authState = {
  user: {
    id: -1,
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: '',
    createdAt: ''
  },
  token: ''
}

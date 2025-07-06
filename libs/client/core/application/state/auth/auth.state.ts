import { UserDto } from '@barbershop-app/shared/types';

export interface AuthState {
  user: UserDto;
  token: string;
}

export const initialAuthState: AuthState = {
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

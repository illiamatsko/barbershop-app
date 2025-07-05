import { UserDto } from '@barbershop-app/shared/types';

export interface authState {
  user: UserDto;
  token: string;
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

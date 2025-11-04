import { UserDto } from '@barbershop-app/shared/domain';

export interface AuthState {
  user: Omit<UserDto, 'id'> & { id: number | null };
  token: string;
}

export const initialAuthState: AuthState = {
  user: {
    id: null,
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: '',
    createdAt: ''
  },
  token: ''
}

import { JwtPayload } from '@barbershop-app/models';

export interface userSlice {
  user: JwtPayload,
  token: string
}

export const userInitialSlice: userSlice = {
  user: {
    id: -1,
    email: '',
    role: ''
  },
  token: ''
}

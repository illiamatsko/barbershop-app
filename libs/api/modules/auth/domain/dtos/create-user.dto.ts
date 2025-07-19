import { RolesEnum } from '@barbershop-app/api/shared/auth';

export interface CreateUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: RolesEnum
}

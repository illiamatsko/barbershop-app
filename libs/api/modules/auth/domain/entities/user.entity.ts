import { RolesEnum } from '@barbershop-app/api/shared/auth';

export interface UserEntity {
  id: number
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: RolesEnum
  createdAt: Date
}

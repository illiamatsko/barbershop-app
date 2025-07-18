import { RolesEnum } from './enums/roles.enum';

export interface UserEntity {
  id: number
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: RolesEnum
  createdAt: Date
}

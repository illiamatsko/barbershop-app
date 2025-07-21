import { RolesEnum } from '@barbershop-app/api/shared/auth';

export interface BarberFullEntity {
  id: number
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  photoUrl: string
  experience: number
  status: string
  barbershopId: number
  role: RolesEnum
  createdAt: Date
}

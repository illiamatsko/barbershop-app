import { RolesEnum } from '@barbershop-app/api/shared/auth';

export interface BarberSummaryEntity {
  id: number
  firstName: string
  lastName: string
  photoUrl: string
  experience: number
  status: string
  barbershopId: number
  location: string
  role: RolesEnum
}

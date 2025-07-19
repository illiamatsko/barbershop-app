import { RolesEnum } from '@barbershop-app/api/shared/auth';

export interface BarberSummaryEntity {
  id: number;
  firstName: string;
  lastName: string;
  experience: number;
  status: string,
  location: string,
  role: RolesEnum;
}

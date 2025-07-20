import { RolesEnum } from '@barbershop-app/api/shared/auth';

export interface BarberFullEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  experience: number;
  status: string,
  starRating: number,
  reviewsCount: number,
  location: string,
  role: RolesEnum;
  createdAt: Date;
}

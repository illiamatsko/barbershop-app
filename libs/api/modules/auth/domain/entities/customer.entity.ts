import { RolesEnum } from '@barbershop-app/api/shared/auth';

export interface CustomerEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: RolesEnum;
  createdAt: Date;
}

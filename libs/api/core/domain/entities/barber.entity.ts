import { RolesEnum } from './enums/roles.enum';

export interface BarberEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  experience: number;
  status: string,
  role: RolesEnum;
  createdAt: Date;
}

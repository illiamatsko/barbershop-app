import { RolesEnum } from './enums/roles.enum';

export interface BarberFullEntity {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  experience: number;
  status: string,
  location: string,
  role: RolesEnum;
  createdAt: Date;
}

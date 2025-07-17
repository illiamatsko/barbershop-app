import { RolesEnum } from './enums/roles.enum';

export interface BarberSummaryEntity {
  id: number;
  firstName: string;
  lastName: string;
  experience: number;
  status: string,
  location: string,
  role: RolesEnum;
}

import { RolesEnum } from '../enums/roles.enum';

export interface JwtPayload {
  id: number;
  email: string;
  role: RolesEnum;
}

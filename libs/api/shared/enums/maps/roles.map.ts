import { Role as PrismaRole } from '@prisma/client';
import { RolesEnum } from '../roles.enum';

export const RoleMap: Record<PrismaRole, RolesEnum> = {
  CUSTOMER: RolesEnum.CUSTOMER,
  BARBER: RolesEnum.BARBER,
  MANAGER: RolesEnum.MANAGER,
  SUPER_ADMIN: RolesEnum.SUPER_ADMIN
};

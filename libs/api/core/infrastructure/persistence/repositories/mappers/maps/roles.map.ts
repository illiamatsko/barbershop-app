import { RolesEnum } from '@barbershop-app/api/core/domain';
import { Role as PrismaRole } from '@prisma/client';

export const RoleMap: Record<PrismaRole, RolesEnum> = {
  CUSTOMER: RolesEnum.CUSTOMER,
  BARBER: RolesEnum.BARBER,
  MANAGER: RolesEnum.MANAGER,
  SUPER_ADMIN: RolesEnum.SUPER_ADMIN
};

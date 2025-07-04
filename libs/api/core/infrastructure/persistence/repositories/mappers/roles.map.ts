import { RolesEnum } from '@barbershop-app/core/domain';
import { Role as PrismaRole } from '@prisma/client';

export const RoleMap: Record<PrismaRole, RolesEnum> = {
  CLIENT: RolesEnum.CLIENT,
  BARBER: RolesEnum.BARBER,
  MANAGER: RolesEnum.MANAGER,
  SUPER_ADMIN: RolesEnum.SUPER_ADMIN
};

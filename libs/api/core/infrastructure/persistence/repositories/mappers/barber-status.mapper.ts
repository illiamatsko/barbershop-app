import { BarberStatus } from '@prisma/client';
import { BarberStatusEntity } from '@barbershop-app/api/core/domain';

export class BarberStatusMapper {
  static toDomain(barberStatus: BarberStatus): BarberStatusEntity {
    return {
      name: barberStatus.name,
      alias: barberStatus.alias,
      description: barberStatus.description
    }
  }
}

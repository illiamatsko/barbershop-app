import { BarberStatus } from '@prisma/client';
import { BarberStatusEntity } from '@barbershop-app/api/barber/domain';

export class BarberStatusMapper {
  static toEntity(barberStatus: BarberStatus): BarberStatusEntity {
    return {
      name: barberStatus.name,
      alias: barberStatus.alias,
      description: barberStatus.description
    }
  }
}

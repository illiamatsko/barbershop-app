import { BarberStatusEntity } from '../entities/barber-status.entity';
import { BarberStatusDto } from '@barbershop-app/shared/types';


export class BarberStatusMapper {
  static toDto(barberStatus: BarberStatusEntity): BarberStatusDto {
    return {
      name: barberStatus.name,
      alias: barberStatus.alias,
      description: barberStatus.description
    }
  }
}

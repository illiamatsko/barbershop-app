import { BarbershopEntity } from '../entities/barbershop.entity';
import { BarbershopDto } from '@barbershop-app/shared/types';

export class BarbershopMapper {
  static toDto(barbershop: BarbershopEntity): BarbershopDto {
    return {
      id: barbershop.id
    }
  }
}

import { Barbershop } from '@prisma/client';
import { BarbershopEntity } from '@barbershop-app/api/barbershop/domain';

export class BarbershopMapper {
  static toEntity(barbershop: Barbershop): BarbershopEntity {
    return {
      id: barbershop.id
    }
  }
}

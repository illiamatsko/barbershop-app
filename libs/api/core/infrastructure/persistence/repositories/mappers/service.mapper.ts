import { Service } from '@prisma/client';
import { ServiceEntity } from '@barbershop-app/api/core/domain';

export class ServiceMapper {
  static toDomain(service: Service & { minPrice: number, maxPrice: number }): ServiceEntity {
    return {
      id: service.id,
      name: service.name,
      description: service.description,
      isMain: service.isMain,
      duration: service.duration,
      minPrice: service.minPrice,
      maxPrice: service.maxPrice
    };
  }
}

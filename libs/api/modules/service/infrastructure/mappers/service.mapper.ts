import { Service } from '@prisma/client';
import { ServiceEntity } from '@barbershop-app/api/service/domain';

export class ServiceMapper {
  static toEntity(service: Service & { minPrice: number, maxPrice: number }): ServiceEntity {
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

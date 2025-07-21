import { ServiceDto } from '@barbershop-app/shared/domain';
import { ServiceEntity } from '../entities/service.entity';

export class ServiceMapper {
  static toDto(service: ServiceEntity): ServiceDto {
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

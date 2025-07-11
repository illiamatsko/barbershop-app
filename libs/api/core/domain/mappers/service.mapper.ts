import { ServiceDto } from '@barbershop-app/shared/types';
import { ServiceEntity } from '../entities/service.entity';

export class ServiceMapper {
  static toDto(service: ServiceEntity): ServiceDto {
    return {
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
    };
  }
}

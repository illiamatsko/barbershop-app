import { ServiceDto } from '@barbershop-app/shared/types';
import { ServiceEntity } from '../entities/service.entity';

export function ServiceEntityToDto(service: ServiceEntity): ServiceDto {
  return {
    id: service.id,
    name: service.name,
    duration: service.duration
  }
}

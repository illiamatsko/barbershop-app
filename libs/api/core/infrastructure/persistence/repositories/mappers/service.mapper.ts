import { Service } from '@prisma/client';
import { ServiceEntity } from '@barbershop-app/api/core/domain';

export function ServiceToDomainEntity(service: Service): ServiceEntity {
  return {
    id: service.id,
    name: service.name,
    duration: service.duration
  }
}

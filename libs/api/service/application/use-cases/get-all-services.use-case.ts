import { ServiceRepository, ServiceEntity, ServiceMapper } from '@barbershop-app/api/core/domain';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllServicesQuery } from '../queries/get-all-services.query';


@QueryHandler(GetAllServicesQuery)
export class GetAllServicesUseCase implements IQueryHandler<GetAllServicesQuery> {
  constructor(private readonly serviceRepo: ServiceRepository) {}

  async execute(): Promise<ServiceEntity[]> {
    const serviceEntities = await this.serviceRepo.getAll();

    const serviceDtos = [];
    for(const serviceEntity of serviceEntities) {
      serviceDtos.push(ServiceMapper.toDto(serviceEntity));
    }

    return serviceDtos;
  }
}

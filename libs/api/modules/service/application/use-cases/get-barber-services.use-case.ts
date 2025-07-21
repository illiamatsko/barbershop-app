import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBarberServicesQuery } from '../queries/get-barber-services.query';
import { ServiceDto } from '@barbershop-app/shared/domain';
import { ServiceRepository, ServiceMapper } from '@barbershop-app/api/service/domain';


@QueryHandler(GetBarberServicesQuery)
export class GetBarberServicesUseCase implements IQueryHandler<GetBarberServicesQuery> {
  constructor(
    private readonly serviceRepo: ServiceRepository
  ) {}

  async execute(query: GetBarberServicesQuery): Promise<ServiceDto[]> {
    const services = await this.serviceRepo.getServicesByBarberId(query.barberId);
    return services.map(service => ServiceMapper.toDto(service));
  }
}

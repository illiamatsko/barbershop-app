import { BarberRepository, ServiceMapper, ServiceRepository } from '@barbershop-app/api/core/domain';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBarberServicesQuery } from '../queries/get-barber-services.query';
import { ServiceDto } from '@barbershop-app/shared/types';

@QueryHandler(GetBarberServicesQuery)
export class GetBarberServicesUseCase implements IQueryHandler<GetBarberServicesQuery> {
  constructor(
    private readonly barberRepo: BarberRepository,
    private readonly serviceRepo: ServiceRepository
  ) {}

  async execute(query: GetBarberServicesQuery): Promise<ServiceDto[]> {
    const barberServices = await this.barberRepo.getServicesByBarberId(query.barberId);

    const servicesDtos: ServiceDto[] = [];
    for (const { serviceId } of barberServices) {
      const serviceEntity = await this.serviceRepo.getById(serviceId);
      if (serviceEntity) {
        const serviceDto = ServiceMapper.toDto(serviceEntity)
        servicesDtos.push(serviceDto);
      }
    }

    return servicesDtos;
  }
}

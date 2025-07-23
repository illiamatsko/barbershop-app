import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBarberServicesIdsQuery } from '../queries/get-barber-services-ids.query';
import { ServiceRepository } from '@barbershop-app/api/service/domain';


@QueryHandler(GetBarberServicesIdsQuery)
export class GetBarberServicesIdsUseCase implements IQueryHandler<GetBarberServicesIdsQuery> {
  constructor(
    private readonly serviceRepo: ServiceRepository
  ) {}

  async execute(query: GetBarberServicesIdsQuery): Promise<number[]> {
    return this.serviceRepo.getServiceIdsByBarberId(query.barberId);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ServiceRepository } from '@barbershop-app/api/service/domain';
import { GetPricesByBarberStatusQuery } from '../queries/get-prices-by-barber-status.query';


@QueryHandler(GetPricesByBarberStatusQuery)
export class GetPricesByBarberStatusUseCase implements IQueryHandler<GetPricesByBarberStatusQuery> {
  constructor(
    private readonly serviceRepo: ServiceRepository
  ) {}

  async execute(query: GetPricesByBarberStatusQuery): Promise<{serviceId: number, price: number}[]> {
    return this.serviceRepo.getPricesByBarberStatus(query.status);
  }
}
